import { NextResponse } from 'next/server';
import { isAuthed } from '@/lib/auth';

// Authenticated download proxy: browser → admin route (cookie-gated) → backend (x-admin-token) →
// streams the stored STL back. Keeps the admin token server-side; the BE endpoint is admin-only.
const BASE = (process.env.BACKEND_API_URL || 'http://localhost:4000').replace(/\/+$/, '');
const TOKEN = process.env.ADMIN_TOKEN || '';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ quoteId: string; fileId: string }> },
): Promise<NextResponse> {
  if (!(await isAuthed())) return new NextResponse('Unauthorized', { status: 401 });
  const { quoteId, fileId } = await params;
  const res = await fetch(`${BASE}/admin/print-quotes/${quoteId}/files/${fileId}`, {
    headers: { 'x-admin-token': TOKEN },
    cache: 'no-store',
  });
  if (!res.ok) return new NextResponse('Not found', { status: res.status });
  const buf = await res.arrayBuffer();
  return new NextResponse(buf, {
    status: 200,
    headers: {
      'content-type': res.headers.get('content-type') ?? 'application/octet-stream',
      'content-disposition': res.headers.get('content-disposition') ?? 'attachment',
    },
  });
}
