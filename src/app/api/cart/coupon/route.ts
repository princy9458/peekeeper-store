import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({ code: body.code, discount: 500 });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid coupon' }, { status: 400 });
  }
}
