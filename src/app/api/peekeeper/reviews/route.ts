import { NextRequest, NextResponse } from 'next/server';
import { addPeekeeperReview, getPeekeeperReviews } from '@/lib/peekeeper-shop-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit') || '4');
  const offset = Number(searchParams.get('offset') || '0');
  const filter = searchParams.get('filter') || undefined;

  return NextResponse.json(getPeekeeperReviews(limit, offset, filter));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const review = addPeekeeperReview({
    name: body.name || 'Anonymous',
    date: body.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    title: body.title || 'New review',
    text: body.text || '',
    stars: Number(body.stars || 5),
    image: body.image,
    helpful: 0,
    notHelpful: 0,
    verified: Boolean(body.verified),
    withImages: Boolean(body.image),
  });

  return NextResponse.json({ review }, { status: 201 });
}

