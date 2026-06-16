import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({
      orderId: 'order_mock_123',
      amount: body.amount || 0,
      currency: 'USD',
    });
  } catch (error) {
    return NextResponse.json({ message: 'Payment failed' }, { status: 500 });
  }
}
