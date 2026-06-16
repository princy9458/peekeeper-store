import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  return NextResponse.json({ items: [] });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({ items: [] });
}
