

FROM node:18-alpine AS base

ENV BUILT_FRITZBOX_HOST=fritz.box
ENV BUILT_FRITZBOX_PORT=49000
ENV BUILT_FRITZBOX_SSL=0
ENV BUILT_NEXTAUTH_URL=http://localhost:3000
ENV BUILT_NEXTAUTH_SECRET=secret
ENV SKIP_ENV_VALIDATION=true

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
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
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/edge-chunks ./.next/edge-chunks
COPY --from=builder /app/scripts ./scripts

EXPOSE 3000
ENV PORT 3000
CMD ["./scripts/start.sh"]