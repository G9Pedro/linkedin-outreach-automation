import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ConnectionManager } from '@/lib/automation/connection-manager'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const connectionManager = new ConnectionManager(prisma)
    const result = await connectionManager.sendConnectionRequests(params.id)

    return NextResponse.json({
      success: true,
      ...result,
    })
  } catch (error) {
    console.error('Failed to start campaign:', error)
    return NextResponse.json(
      { error: 'Failed to start campaign' },
      { status: 500 }
    )
  }
}