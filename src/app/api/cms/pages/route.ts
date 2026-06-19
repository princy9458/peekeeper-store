import { NextResponse } from 'next/server';
import { loadAllPages } from '@/components/cms/loader';

export async function GET() {
  const pages = loadAllPages();
  return NextResponse.json({ data: pages });
}
