// app/api/purchase-requests/interests/route.ts
import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const contractorProfileId = searchParams.get('contractorProfileId');

    if (!contractorProfileId) {
      return NextResponse.json(
        { error: 'Contractor profile ID is required' },
        { status: 400 }
      );
    }

    // Get all purchase requests for this contractor
    const purchaseRequests = await prisma.purchaseRequest.findMany({
      where: {
        contractorProfileId,
        status: 'ACTIVE', // Only show active requests
      },
      select: {
        interests: true,
      },
    });

    // Combine all interest IDs from all purchase requests
    const farmerIds = purchaseRequests.flatMap(pr => pr.interests);

    // Get unique farmer IDs
    const uniqueFarmerIds = [...new Set(farmerIds)];

    // Fetch complete farmer user details with their profiles
    const farmers = await prisma.user.findMany({
      where: {
        id: { in: uniqueFarmerIds },
        role: 'FARMER',
      },
      include: {
        farmerProfile: {
          include: {
            listings: {
              where: {
                status: 'ACTIVE',
              },
            },
          },
        },
      },
    });

    // Return complete user profile information
    const userProfiles = farmers.map(farmer => ({
      id: farmer.id,
      clerkId: farmer.clerkId,
      name: farmer.name,
      phone: farmer.phone,
      email: farmer.email,
      role: farmer.role,
      state: farmer.state,
      city: farmer.city,
      createdAt: farmer.createdAt,
      updatedAt: farmer.updatedAt,
      farmerProfile: farmer.farmerProfile ? {
        id: farmer.farmerProfile.id,
        userId: farmer.farmerProfile.userId,
        listings: farmer.farmerProfile.listings.map(listing => ({
          id: listing.id,
          cropType: listing.cropType,
          quantity: listing.quantity,
          createdAt: listing.createdAt,
          status: listing.status,
        })),
      } : null,
    }));

    return NextResponse.json(userProfiles);
  } catch (error) {
    console.error('Error fetching farmer interests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch farmer interests' },
      { status: 500 }
    );
  }
}