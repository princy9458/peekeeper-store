import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    return NextResponse.json({
      user: { id: '1', email, firstName: 'John', lastName: 'Doe', phone: '', role: 'user' },
      token: 'mock-jwt-token',
    });
  } catch (error) {
    return NextResponse.json({ message: 'Login failed' }, { status: 500 });
  }
}
