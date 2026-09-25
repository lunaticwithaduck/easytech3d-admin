# Build: docker build -t easytech3d-admin .
# All config is server-side runtime env (BACKEND_API_URL, ADMIN_TOKEN, ADMIN_PASSWORD) — no build args.

# ---------- build ----------
FROM node:22-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# ---------- runner ----------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup -S app && adduser -S app -G app

# Standalone output bundles only the minimal runtime + required deps.
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static

USER app
EXPOSE 3001
# HOSTNAME must be set here, not via ENV: Docker overwrites HOSTNAME with the container name at
# runtime, and Next standalone would bind to that instead of 0.0.0.0.
CMD ["sh", "-c", "HOSTNAME=0.0.0.0 exec node server.js"]
