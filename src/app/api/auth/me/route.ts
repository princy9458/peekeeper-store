import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    user: { id: '1', email: 'user@example.com', firstName: 'John', lastName: 'Doe', phone: '', role: 'user' },
  });
}
