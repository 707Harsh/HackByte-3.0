import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ListingStatus } from '@prisma/client';

export async function POST(req: Request) {
  try {
    // Get user session from Clerk
    const { userId } = await auth();
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login to create a purchase request' },
        { status: 401 }
      );
    }

    // Parse request body
    const { cropType, quantity, pricePerUnit } = await req.json();
    
    // Validate required fields
    if (!cropType || !quantity || !pricePerUnit) {
      return NextResponse.json(
        { error: 'Missing required fields: cropType, quantity, and pricePerUnit are required' },
        { status: 400 }
      );
    }

    // Get contractor profile associated with the Clerk user ID
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId
      },
      include: {
        contractorProfile: true
      }
    });

    if (!user || !user.contractorProfile) {
      return NextResponse.json(
        { error: 'Contractor profile not found. Please complete your profile first' },
        { status: 404 }
      );
    }

    // Create purchase request with relationship to contractor profile
    const purchaseRequest = await prisma.purchaseRequest.create({
      data: {
        cropType,
        quantity: Number(quantity),
        pricePerUnit: Number(pricePerUnit),
        status: ListingStatus.PENDING,
        contractorProfile: {
          connect: {
            id: user.contractorProfile.id
          }
        }
      }
    });

    // Return the created request
    return NextResponse.json(purchaseRequest, { status: 201 });
  } catch (error) {
    console.error('Error creating purchase request:', error);
    return NextResponse.json(
      { error: 'Failed to create purchase request' },
      { status: 500 }
    );
  }
}

// GET handler to fetch purchase requests for the authenticated contractor
export async function GET(req: Request) {
  try {
    // Get user session from Clerk
    const { userId } = await auth();
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user with contractor profile using Clerk ID
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId
      },
      include: {
        contractorProfile: true
      }
    });

    if (!user || !user.contractorProfile) {
      return NextResponse.json(
        { error: 'Contractor profile not found' },
        { status: 404 }
      );
    }

    // Fetch purchase requests for this contractor
    const purchaseRequests = await prisma.purchaseRequest.findMany({
      where: {
        contractorProfileId: user.contractorProfile.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(purchaseRequests);
  } catch (error) {
    console.error('Error fetching purchase requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch purchase requests' },
      { status: 500 }
    );
  }
}