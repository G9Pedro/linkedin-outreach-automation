import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const campaigns = await prisma.campaign.findMany({
      include: {
        _count: {
          select: { prospects: true },
        },
        analytics: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(campaigns)
  } catch (error) {
    console.error('Failed to fetch campaigns:', error)
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, targetIndustry, messageTemplate } = body

    const campaign = await prisma.campaign.create({
      data: {
        name,
        description,
        targetIndustry,
        messageTemplate: {
          create: {
            industry: targetIndustry,
            connectionMsg: messageTemplate.connectionMsg,
            followUp1: messageTemplate.followUp1,
            followUp2: messageTemplate.followUp2,
            followUp3: messageTemplate.followUp3,
            followUp1Delay: messageTemplate.followUp1Delay || 3,
            followUp2Delay: messageTemplate.followUp2Delay || 7,
            followUp3Delay: messageTemplate.followUp3Delay || 14,
          },
        },
        analytics: {
          create: {},
        },
      },
      include: {
        messageTemplate: true,
        analytics: true,
      },
    })

    return NextResponse.json(campaign, { status: 201 })
  } catch (error) {
    console.error('Failed to create campaign:', error)
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    )
  }
}