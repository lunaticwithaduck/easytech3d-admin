import 'server-only';

const BASE = (process.env.BACKEND_API_URL || 'http://localhost:4000').replace(/\/+$/, '');
const TOKEN = process.env.ADMIN_TOKEN || '';

// Server-side fetch to the backend admin API, authenticated with the shared admin token.
export async function adminFetch<T>(
  path: string,
  opts: { method?: string; body?: unknown } = {},
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: opts.method ?? 'GET',
    headers: { 'content-type': 'application/json', 'x-admin-token': TOKEN },
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`${opts.method ?? 'GET'} ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}
