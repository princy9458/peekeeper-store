import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8000';

const FALLBACK_PAYLOAD = null;

export async function GET() {
  const url = `${BACKEND_URL}/platform/business-blueprint`;
  const headers = new Headers();
  const tenantId = process.env.NEXT_PUBLIC_TENANT_DB || '';
  if (tenantId) {
    headers.set('x-tenant-db', tenantId);
  }

  try {
    const response = await fetch(url, { method: 'GET', headers, signal: AbortSignal.timeout(5000) });
    if (!response.ok) {
      return NextResponse.json({ success: true, data: { payload: FALLBACK_PAYLOAD } });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ success: true, data: { payload: FALLBACK_PAYLOAD } });
  }
}

export async function PUT(request: NextRequest) {
  const url = `${BACKEND_URL}/platform/business-blueprint`;
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  const tenantId = process.env.NEXT_PUBLIC_TENANT_DB || '';
  if (tenantId) {
    headers.set('x-tenant-db', tenantId);
  }

  try {
    const body = await request.json();
    const response = await fetch(url, { method: 'PUT', headers, body: JSON.stringify(body), signal: AbortSignal.timeout(5000) });
    if (!response.ok) {
      return NextResponse.json({ success: true, data: { payload: FALLBACK_PAYLOAD } });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ success: true, data: { payload: FALLBACK_PAYLOAD } });
  }
}
