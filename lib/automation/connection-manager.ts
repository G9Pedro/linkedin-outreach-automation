import { PrismaClient, ProspectStatus } from '@prisma/client'

const MAX_DAILY_CONNECTIONS = parseInt(process.env.NEXT_PUBLIC_MAX_DAILY_CONNECTIONS || '50')

export class ConnectionManager {
  constructor(private prisma: PrismaClient) {}

  /**
   * Send connection requests to pending prospects
   */
  async sendConnectionRequests(campaignId: string): Promise<{
    sent: number
    failed: number
    remaining: number
  }> {
    // Check daily limit
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const sentToday = await this.prisma.prospect.count({
      where: {
        campaignId,
        connectionSentAt: {
          gte: today,
        },
      },
    })

    const remaining = MAX_DAILY_CONNECTIONS - sentToday
    if (remaining <= 0) {
      return { sent: 0, failed: 0, remaining: 0 }
    }

    // Get pending prospects
    const prospects = await this.prisma.prospect.findMany({
      where: {
        campaignId,
        status: ProspectStatus.PENDING,
      },
      take: remaining,
    })

    let sent = 0
    let failed = 0

    for (const prospect of prospects) {
      try {
        // Simulate API call to LinkedIn
        await this.sendConnectionRequest(prospect.id)
        sent++

        // Add delay to mimic human behavior (3-7 seconds)
        await this.delay(3000 + Math.random() * 4000)
      } catch (error) {
        console.error(`Failed to send connection to ${prospect.linkedinUrl}:`, error)
        failed++
      }
    }

    return {
      sent,
      failed,
      remaining: remaining - sent,
    }
  }

  /**
   * Send a connection request to a specific prospect
   */
  private async sendConnectionRequest(prospectId: string): Promise<void> {
    const prospect = await this.prisma.prospect.findUnique({
      where: { id: prospectId },
      include: {
        campaign: {
          include: {
            messageTemplate: true,
          },
        },
      },
    })

    if (!prospect) throw new Error('Prospect not found')

    const template = prospect.campaign.messageTemplate
    if (!template) throw new Error('Message template not found')

    // Personalize connection message
    const message = this.personalizeMessage(
      template.connectionMsg,
      prospect.firstName,
      prospect.company,
      prospect.industry
    )

    // TODO: Integrate with LinkedIn API
    // await linkedinAPI.sendConnectionRequest(prospect.linkedinUrl, message)

    // Update prospect status
    await this.prisma.prospect.update({
      where: { id: prospectId },
      data: {
        status: ProspectStatus.CONNECTION_SENT,
        connectionSentAt: new Date(),
      },
    })

    // Log outreach history
    await this.prisma.outreachHistory.create({
      data: {
        prospectId,
        type: 'CONNECTION_REQUEST',
        message,
      },
    })

    // Update campaign analytics
    await this.updateCampaignAnalytics(prospect.campaignId)
  }

  /**
   * Personalize message with prospect data
   */
  private personalizeMessage(
    template: string,
    firstName: string,
    company?: string | null,
    industry?: string | null
  ): string {
    return template
      .replace(/\{firstName\}/g, firstName)
      .replace(/\{company\}/g, company || 'your company')
      .replace(/\{industry\}/g, industry || 'your industry')
  }

  /**
   * Update campaign analytics
   */
  private async updateCampaignAnalytics(campaignId: string): Promise<void> {
    const stats = await this.prisma.prospect.groupBy({
      by: ['status'],
      where: { campaignId },
      _count: true,
    })

    const totalProspects = stats.reduce((sum, s) => sum + s._count, 0)
    const connectionsSent = stats.find(s => 
      [ProspectStatus.CONNECTION_SENT, ProspectStatus.CONNECTED, 
       ProspectStatus.MESSAGE_SENT, ProspectStatus.REPLIED].includes(s.status)
    )?._count || 0
    const connectionsAccepted = stats.find(s => 
      [ProspectStatus.CONNECTED, ProspectStatus.MESSAGE_SENT, 
       ProspectStatus.REPLIED].includes(s.status)
    )?._count || 0
    const repliesReceived = stats.find(s => s.status === ProspectStatus.REPLIED)?._count || 0
    const conversions = stats.find(s => s.status === ProspectStatus.CONVERTED)?._count || 0

    const connectionRate = connectionsSent > 0 ? (connectionsAccepted / connectionsSent) * 100 : 0
    const responseRate = connectionsAccepted > 0 ? (repliesReceived / connectionsAccepted) * 100 : 0
    const conversionRate = totalProspects > 0 ? (conversions / totalProspects) * 100 : 0

    await this.prisma.campaignAnalytics.upsert({
      where: { campaignId },
      create: {
        campaignId,
        totalProspects,
        connectionsSent,
        connectionsAccepted,
        repliesReceived,
        conversions,
        connectionRate,
        responseRate,
        conversionRate,
        messagesSent: 0,
      },
      update: {
        totalProspects,
        connectionsSent,
        connectionsAccepted,
        repliesReceived,
        conversions,
        connectionRate,
        responseRate,
        conversionRate,
      },
    })
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}