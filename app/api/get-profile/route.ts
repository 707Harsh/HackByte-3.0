// /app/api/get-profile/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clerkUserId = searchParams.get('clerkUserId');

  if (!clerkUserId) {
    return NextResponse.json({ error: 'Missing clerkUserId' }, { status: 400 });
  }

  try {
    const user = await db.user.findUnique({
      where: { clerkId: clerkUserId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
