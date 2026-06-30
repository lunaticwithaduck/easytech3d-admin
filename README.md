# easytech3d-admin

Internal **admin dashboard** for [easytech3d.com](https://www.easytech3d.com/) — where the
operator works orders, print-quotes, and leads. A thin Next.js app that consumes the
[easytech3d-backend](https://github.com/lunaticwithaduck/easytech3d-backend) admin API; it holds
no database of its own.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** strict
- **Tailwind CSS 4** (`@tailwindcss/postcss`)
- **Server-only** data access — reads proxy the backend with the `x-admin-token` secret, never exposed to the client

## Getting started

```sh
pnpm install
cp .env.example .env        # set BACKEND_API_URL, ADMIN_TOKEN, ADMIN_PASSWORD
pnpm dev                    # http://localhost:3001
```

Requires the backend running (default `http://localhost:4000`).

## Scripts

| script | what |
|---|---|
| `pnpm dev` | Next.js dev server on **:3001** |
| `pnpm build` / `start` | production build / serve on :3001 |
| `pnpm typecheck` | `tsc --noEmit` |

## Structure

`src/app/`

| route | what |
|---|---|
| `login` | operator login (password → `ADMIN_PASSWORD`) |
| `orders` | order list + detail |
| `quotes` | STL print-quote requests |
| `leads` | contact messages, newsletter, back-in-stock |
| `api/quote-file` | proxies print-quote file downloads from the backend (keeps the admin token server-side) |

## Environment

See `.env.example`:

| var | purpose |
|---|---|
| `BACKEND_API_URL` | the easytech3d-backend base URL (default `http://localhost:4000`) |
| `ADMIN_TOKEN` | shared secret sent as `x-admin-token` — **must match** the backend's `ADMIN_TOKEN` |
| `ADMIN_PASSWORD` | password the operator types on the login screen |

## Related repos

- [`easytech3d`](https://github.com/lunaticwithaduck/easytech3d) — storefront frontend (Next.js, :3000)
- [`easytech3d-backend`](https://github.com/lunaticwithaduck/easytech3d-backend) — NestJS + Prisma API (:4000)
