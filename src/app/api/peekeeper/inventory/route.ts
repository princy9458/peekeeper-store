import { NextResponse } from 'next/server';
import { getPeekeeperProduct, getVariantBySelection } from '@/lib/peekeeper-shop-data';

export async function GET() {
  const product = getPeekeeperProduct();
  return NextResponse.json({
    inventory: product.inventory,
    variants: product.variants,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const variant = getVariantBySelection(String(body.size || ''), String(body.color || ''));
  const product = getPeekeeperProduct();
  return NextResponse.json({
    inventory: variant?.stock ?? product.inventory,
    variant,
  });
}

