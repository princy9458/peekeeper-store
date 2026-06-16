import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName } = body;

    return NextResponse.json({
      user: { id: '1', email, firstName, lastName, phone: body.phone || '', role: 'user' },
      token: 'mock-jwt-token',
    });
  } catch (error) {
    return NextResponse.json({ message: 'Registration failed' }, { status: 500 });
  }
}
