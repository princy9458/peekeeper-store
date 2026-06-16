import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ orders: [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ order: { id: '1', ...body, status: 'confirmed' } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create order' }, { status: 500 });
  }
}
