// app/api/farmer/confirm-contract/route.ts

import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    console.log('Confirm contract API called');
    
    const { userId } = getAuth(request as any);
    console.log('User ID from Clerk:', userId);
    
    if (!userId) {
      console.log('Unauthorized - No user ID found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const requestBody = await request.json();
    const { requestId } = requestBody;
    console.log('Request body:', requestBody);

    if (!requestId) {
      console.log('Missing request ID');
      return NextResponse.json({ error: 'Request ID is required' }, { status: 400 });
    }

    // Verify the farmer exists
    console.log('Looking up farmer with clerkId:', userId);
    const farmer = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true }
    });

    console.log('Farmer lookup result:', farmer);

    if (!farmer) {
      console.log('Farmer not found');
      return NextResponse.json({ error: 'Farmer not found' }, { status: 404 });
    }

    // Update the purchase request status
    console.log('Updating purchase request:', requestId);
    try {
      const updatedRequest = await prisma.purchaseRequest.update({
        where: { id: requestId },
        data: { status: 'ACTIVE' },
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
        }
      });

      console.log('Purchase request updated:', updatedRequest);

      // Create a chat room between farmer and contractor
      console.log('Creating chat room between farmer and contractor');
      await prisma.chatRoom.create({
        data: {
          farmerId: farmer.id,
          contractorId: updatedRequest.contractorProfile.userId
        }
      });

      // Format the response
      const formattedResponse = {
        id: updatedRequest.id,
        cropType: updatedRequest.cropType,
        quantity: updatedRequest.quantity,
        pricePerUnit: updatedRequest.pricePerUnit,
        status: updatedRequest.status,
        contractorProfile: {
          userName: updatedRequest.contractorProfile.user.name,
          companyName: updatedRequest.contractorProfile.companyName || ''
        }
      };

      console.log('Sending successful response:', formattedResponse);
      return NextResponse.json(formattedResponse);
    } catch (prismaError) {
      console.error('Prisma error:', prismaError);
      let errorMessage = 'Database operation failed';
      if (prismaError instanceof Error) {
        errorMessage = prismaError.message;
      }
      return NextResponse.json(
        { error: 'Database operation failed', details: errorMessage },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in confirm-contract API:', error);
    let errorMessage = 'Failed to confirm contract';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { error: 'Failed to confirm contract', details: errorMessage },
      { status: 500 }
    );
  }
}