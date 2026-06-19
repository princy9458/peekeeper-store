import { NextRequest, NextResponse } from 'next/server';
import defaultBlueprint from '@/lib/data/blueprint/defaultBlueprint.json';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: { payload: defaultBlueprint },
  });
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      data: { payload: body.payload || defaultBlueprint },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body' },
      { status: 400 }
    );
  }
}
