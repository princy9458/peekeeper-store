import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json({
    id,
    name: 'PeeKeeper Dog Diaper',
    price: 2999,
    originalPrice: 3999,
    description: 'Premium escape-proof dog diaper.',
    images: ['/images/product-1.svg'],
    rating: 4.8,
    reviews: 42,
  });
}
