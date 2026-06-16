import { NextResponse } from 'next/server';

const products = [
  { id: '1', name: 'PeeKeeper Dog Diaper - Walnut', price: 2999, originalPrice: 3999, image: '/images/product-1.svg', slug: 'pee-keeper-diaper-walnut', category: 'diapers', rating: 4.8 },
  { id: '2', name: 'PeeKeeper Dog Diaper - Pink', price: 2999, originalPrice: 3999, image: '/images/product-2.svg', slug: 'pee-keeper-diaper-pink', category: 'diapers', rating: 4.7 },
  { id: '3', name: 'PeeKeeper Dog Diaper - Denim', price: 3199, originalPrice: 4199, image: '/images/product-3.svg', slug: 'pee-keeper-diaper-denim', category: 'diapers', rating: 4.9 },
  { id: '4', name: 'Net Wash Bag', price: 1299, originalPrice: 1599, image: '/images/product-4.svg', slug: 'net-wash-bag', category: 'accessories', rating: 4.5 },
  { id: '5', name: 'PeeKeeper Dog Diaper - Lilac', price: 2999, originalPrice: 3999, image: '/images/product-5.svg', slug: 'pee-keeper-diaper-lilac', category: 'diapers', rating: 4.6 },
  { id: '6', name: 'Starter Bundle', price: 5499, originalPrice: 6999, image: '/images/product-6.svg', slug: 'starter-bundle', category: 'bundles', rating: 4.9 },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let filtered = [...products];
  if (category) filtered = filtered.filter(p => p.category === category);
  if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return NextResponse.json({ products: filtered, total: filtered.length });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProduct = { id: String(products.length + 1), ...body };
    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create product' }, { status: 500 });
  }
}
