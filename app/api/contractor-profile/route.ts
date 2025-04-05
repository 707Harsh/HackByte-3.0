// app/api/contractor-profile/route.ts
import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clerkId = searchParams.get('clerkId');

    if (!clerkId) {
      return NextResponse.json(
        { error: 'Clerk ID is required' },
        { status: 400 }
      );
    }

    const contractorProfile = await prisma.user.findUnique({
      where: {
        clerkId,
        role: 'CONTRACTOR',
      },
      include: {
        contractorProfile: true,
      },
    });

    if (!contractorProfile || !contractorProfile.contractorProfile) {
      return NextResponse.json(
        { error: 'Contractor profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(contractorProfile.contractorProfile);
  } catch (error) {
    console.error('Error fetching contractor profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contractor profile' },
      { status: 500 }
    );
  }
}