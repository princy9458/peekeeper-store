import { NextResponse } from 'next/server';
import { loadPageData } from '@/components/cms/loader';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = loadPageData(slug);

  if (!page) {
    return NextResponse.json(
      { message: `Page not found: ${slug}` },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: page });
}
