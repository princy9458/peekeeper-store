import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ items: [] });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({ items: [{ id: '1', productId: body.productId, name: 'Product', price: 2999, image: '/images/product-1.svg', slug: 'product-slug' }] });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to add to wishlist' }, { status: 500 });
  }
}
