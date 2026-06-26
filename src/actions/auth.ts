'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, sessionToken } from '@/lib/auth';

export async function login(_prev: { error?: string }, formData: FormData): Promise<{ error?: string }> {
  const password = String(formData.get('password') ?? '');
  if (!password || password !== (process.env.ADMIN_PASSWORD || '')) {
    return { error: 'Грешна парола.' };
  }
  // Store the DERIVED session token, not the raw backend master secret.
  (await cookies()).set(SESSION_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8h
  });
  redirect('/');
}

export async function logout(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
  redirect('/login');
}
