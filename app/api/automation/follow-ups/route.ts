import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { FollowUpManager } from '@/lib/automation/follow-up-manager'

export async function POST(request: NextRequest) {
  try {
    const followUpManager = new FollowUpManager(prisma)
    const result = await followUpManager.processFollowUps()

    return NextResponse.json({
      success: true,
      ...result,
    })
  } catch (error) {
    console.error('Failed to process follow-ups:', error)
    return NextResponse.json(
      { error: 'Failed to process follow-ups' },
      { status: 500 }
    )
  }
}