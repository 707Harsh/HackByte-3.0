import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const purchaseRequests = await prisma.purchaseRequest.findMany({
      select: {
        interests: true,
      },
    })

    const allInterests = purchaseRequests.flatMap((pr) => pr.interests)
    return NextResponse.json({ interests: allInterests })
  } catch (error) {
    console.error('Error fetching interests:', error)
    return NextResponse.json({ error: 'Failed to fetch interests' }, { status: 500 })
  }
}
