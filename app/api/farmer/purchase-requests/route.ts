import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { userId } = getAuth(request as any);
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the farmer's location
    const farmer = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: {
        state: true,
        city: true
      }
    });

    if (!farmer) {
      return NextResponse.json({ error: 'Farmer not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const cropType = searchParams.get('cropType');
    const maxQuantity = searchParams.get('maxQuantity');

    // Build the query conditions
    const where: any = {
      status: 'PENDING', 
      contractorProfile: {
        user: {
          state: farmer.state,
          city: farmer.city
        }
      }
    };

    if (cropType) {
      where.cropType = {
        contains: cropType,
        mode: 'insensitive' // Case insensitive search
      };
    }

    if (maxQuantity) {
      where.quantity = {
        lte: parseFloat(maxQuantity) // Less than or equal to the specified quantity
      };
    }

    const purchaseRequests = await prisma.purchaseRequest.findMany({
      where,
      include: {
        contractorProfile: {
          include: {
            user: {
              select: {
                name: true,
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform the data to match your frontend interface
    const formattedRequests = purchaseRequests.map((request) => ({
      id: request.id,
      cropType: request.cropType,
      quantity: request.quantity,
      pricePerUnit: request.pricePerUnit,
      contractorProfile: {
        userName: request.contractorProfile.user.name,
        companyName: request.contractorProfile.companyName || ''
      },
      status: request.status
    }));

    return NextResponse.json(formattedRequests);
  } catch (error) {
    console.error('Error fetching purchase requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch purchase requests' },
      { status: 500 }
    );
  }
}