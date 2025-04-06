import { NextResponse, NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import {prisma} from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId: clerkUserId } = getAuth(request);

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: clerkUserId as string },
      select: {
        name: true,
        email: true,
      },
    });

    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(dbUser);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { userId: string } }
  ) {
    try {
      const { userId: clerkUserId } = getAuth(request);
      const body = await request.json();
      
      const updatedUser = await prisma.user.update({
        where: { clerkId: clerkUserId as string },
        data: {
          name: body.name,
          email: body.email,
        }
      });
  
      return NextResponse.json(updatedUser);
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 }
      );
    }
  }