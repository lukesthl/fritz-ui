FROM oven/bun:alpine AS base

ENV BUILT_FRITZBOX_HOST=fritz.box
ENV BUILT_FRITZBOX_PORT=49000
ENV BUILT_FRITZBOX_SSL=0
ENV BUILT_NEXTAUTH_URL=http://localhost:3000
ENV BUILT_NEXTAUTH_SECRET=secret
ENV SKIP_ENV_VALIDATION=true

FROM base AS deps
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM node:22-alpine AS builder
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache libc6-compat python3 make g++

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build with Node.js
ENV NODE_ENV=production
RUN npm run build

# Production image, copy all the files and run next
FROM builder AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_SECRET=secret
ENV FRITZBOX_HOST=fritz.box
ENV FRITZBOX_PORT=49000
ENV FRITZBOX_SSL=0

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=builder /app/scripts ./scripts

EXPOSE 3000
ENV PORT 3000
CMD ["./scripts/start.sh"]