import { NextResponse } from 'next/server';
import { Role } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { name, phone, email, role, state, city, clerkUserId } = await req.json();

    // Validate required fields
    if (!name || !phone || !role || !state || !city || !clerkUserId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const trimmedEmail = email?.trim() || undefined;

    // Check if user already exists in our database
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { phone },
          ...(trimmedEmail ? [{ email: trimmedEmail }] : []),
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this phone number or email already exists' },
        { status: 409 }
      );
    }

    // Update Clerk user with the provided name
    await (await clerkClient()).users.updateUser(clerkUserId, {
      firstName: name.trim().split(' ')[0],
      lastName: name.trim().split(' ').slice(1).join(' ') || '',
    });

    // Create user in our database
    const user = await prisma.user.create({
      data: {
        name,
        phone,
        email: trimmedEmail,
        role: role as Role,
        state,
        city,
        clerkId: clerkUserId,
      },
    });

    // Create the appropriate profile based on role
    if (role === 'FARMER') {
      await prisma.farmerProfile.create({
        data: {
          userId: user.id,
        },
      });
    } else if (role === 'CONTRACTOR') {
      await prisma.contractorProfile.create({
        data: {
          userId: user.id,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error completing profile:', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A user with this phone number or email already exists.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
