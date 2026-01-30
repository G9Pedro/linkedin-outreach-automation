import { PrismaClient, ProspectStatus, OutreachType } from '@prisma/client'

export class FollowUpManager {
  constructor(private prisma: PrismaClient) {}

  /**
   * Process follow-up sequences for all active campaigns
   */
  async processFollowUps(): Promise<{
    sent: number
    skipped: number
  }> {
    const campaigns = await this.prisma.campaign.findMany({
      where: { status: 'ACTIVE' },
      include: { messageTemplate: true },
    })

    let totalSent = 0
    let totalSkipped = 0

    for (const campaign of campaigns) {
      const { sent, skipped } = await this.processCampaignFollowUps(campaign.id)
      totalSent += sent
      totalSkipped += skipped
    }

    return { sent: totalSent, skipped: totalSkipped }
  }

  /**
   * Process follow-ups for a specific campaign
   */
  async processCampaignFollowUps(campaignId: string): Promise<{
    sent: number
    skipped: number
  }> {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { messageTemplate: true },
    })

    if (!campaign || !campaign.messageTemplate) {
      return { sent: 0, skipped: 0 }
    }

    const template = campaign.messageTemplate
    let sent = 0
    let skipped = 0

    // Get prospects ready for first message
    const firstMessageProspects = await this.getProspectsReadyForFirstMessage(campaignId)
    for (const prospect of firstMessageProspects) {
      try {
        await this.sendFirstMessage(prospect.id, template.followUp1)
        sent++
        await this.delay(2000 + Math.random() * 3000)
      } catch (error) {
        console.error(`Failed to send first message to prospect ${prospect.id}:`, error)
        skipped++
      }
    }

    // Get prospects ready for follow-up 1
    if (template.followUp2) {
      const followUp1Prospects = await this.getProspectsReadyForFollowUp(
        campaignId,
        OutreachType.FIRST_MESSAGE,
        template.followUp1Delay
      )
      for (const prospect of followUp1Prospects) {
        try {
          await this.sendFollowUp(prospect.id, template.followUp2, OutreachType.FOLLOW_UP_1)
          sent++
          await this.delay(2000 + Math.random() * 3000)
        } catch (error) {
          console.error(`Failed to send follow-up 1 to prospect ${prospect.id}:`, error)
          skipped++
        }
      }
    }

    // Get prospects ready for follow-up 2
    if (template.followUp3 && template.followUp2Delay) {
      const followUp2Prospects = await this.getProspectsReadyForFollowUp(
        campaignId,
        OutreachType.FOLLOW_UP_1,
        template.followUp2Delay
      )
      for (const prospect of followUp2Prospects) {
        try {
          await this.sendFollowUp(prospect.id, template.followUp3, OutreachType.FOLLOW_UP_2)
          sent++
          await this.delay(2000 + Math.random() * 3000)
        } catch (error) {
          console.error(`Failed to send follow-up 2 to prospect ${prospect.id}:`, error)
          skipped++
        }
      }
    }

    return { sent, skipped }
  }

  /**
   * Get prospects ready for first message (connected but no message sent)
   */
  private async getProspectsReadyForFirstMessage(campaignId: string) {
    return this.prisma.prospect.findMany({
      where: {
        campaignId,
        status: ProspectStatus.CONNECTED,
        outreach: {
          none: {
            type: OutreachType.FIRST_MESSAGE,
          },
        },
      },
    })
  }

  /**
   * Get prospects ready for follow-up based on last outreach type and delay
   */
  private async getProspectsReadyForFollowUp(
    campaignId: string,
    lastOutreachType: OutreachType,
    delayDays: number
  ) {
    const delayDate = new Date()
    delayDate.setDate(delayDate.getDate() - delayDays)

    const prospects = await this.prisma.prospect.findMany({
      where: {
        campaignId,
        status: ProspectStatus.MESSAGE_SENT,
      },
      include: {
        outreach: {
          orderBy: { sentAt: 'desc' },
          take: 1,
        },
      },
    })

    return prospects.filter(p => {
      const lastOutreach = p.outreach[0]
      return (
        lastOutreach &&
        lastOutreach.type === lastOutreachType &&
        lastOutreach.sentAt <= delayDate &&
        !lastOutreach.response
      )
    })
  }

  /**
   * Send first message to connected prospect
   */
  private async sendFirstMessage(prospectId: string, message: string) {
    const prospect = await this.prisma.prospect.findUnique({
      where: { id: prospectId },
    })

    if (!prospect) throw new Error('Prospect not found')

    const personalizedMessage = this.personalizeMessage(
      message,
      prospect.firstName,
      prospect.company,
      prospect.industry
    )

    // TODO: Integrate with LinkedIn API
    // await linkedinAPI.sendMessage(prospect.linkedinUrl, personalizedMessage)

    await this.prisma.prospect.update({
      where: { id: prospectId },
      data: {
        status: ProspectStatus.MESSAGE_SENT,
        lastContactedAt: new Date(),
      },
    })

    await this.prisma.outreachHistory.create({
      data: {
        prospectId,
        type: OutreachType.FIRST_MESSAGE,
        message: personalizedMessage,
      },
    })
  }

  /**
   * Send follow-up message
   */
  private async sendFollowUp(
    prospectId: string,
    message: string,
    type: OutreachType
  ) {
    const prospect = await this.prisma.prospect.findUnique({
      where: { id: prospectId },
    })

    if (!prospect) throw new Error('Prospect not found')

    const personalizedMessage = this.personalizeMessage(
      message,
      prospect.firstName,
      prospect.company,
      prospect.industry
    )

    // TODO: Integrate with LinkedIn API
    // await linkedinAPI.sendMessage(prospect.linkedinUrl, personalizedMessage)

    await this.prisma.prospect.update({
      where: { id: prospectId },
      data: {
        lastContactedAt: new Date(),
      },
    })

    await this.prisma.outreachHistory.create({
      data: {
        prospectId,
        type,
        message: personalizedMessage,
      },
    })
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

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}