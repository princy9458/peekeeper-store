import { NextResponse } from 'next/server';
import { getPeekeeperProduct } from '@/lib/peekeeper-shop-data';

export async function GET() {
  return NextResponse.json({ product: getPeekeeperProduct() });
}

