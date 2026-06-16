import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ items: [], couponCode: null, discount: 0 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({ items: [{ id: '1', ...body }], couponCode: null, discount: 0 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to add to cart' }, { status: 500 });
  }
}
