import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { prospects } = body

    const createdProspects = await prisma.prospect.createMany({
      data: prospects.map((p: any) => ({
        ...p,
        campaignId: params.id,
      })),
      skipDuplicates: true,
    })

    return NextResponse.json(
      { count: createdProspects.count },
      { status: 201 }
    )
  } catch (error) {
    console.error('Failed to add prospects:', error)
    return NextResponse.json(
      { error: 'Failed to add prospects' },
      { status: 500 }
    )
  }
}