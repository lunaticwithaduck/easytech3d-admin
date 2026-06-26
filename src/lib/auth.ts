import 'server-only';
import { createHash, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const SESSION_COOKIE = 'etd_admin';

// The session cookie holds a value DERIVED from ADMIN_TOKEN — never ADMIN_TOKEN itself.
// ADMIN_TOKEN is the backend master secret (sent as x-admin-token, server-side only via adminFetch);
// keeping it out of the browser means a leaked cookie can't be replayed against the backend.
export function sessionToken(): string {
  return createHash('sha256')
    .update(`${process.env.ADMIN_TOKEN || ''}:etd-admin-session`)
    .digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export async function isAuthed(): Promise<boolean> {
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!value || !process.env.ADMIN_TOKEN) return false;
  return safeEqual(value, sessionToken());
}

export async function requireAuth(): Promise<void> {
  if (!(await isAuthed())) redirect('/login');
}
