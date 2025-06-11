FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production --no-audit --prefer-offline && npm cache clean --force

# Build the source code
FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json* ./

# Set memory limits and timeouts for build
ENV NODE_OPTIONS="--max-old-space-size=2048 --max-http-header-size=65536"
ENV NPM_CONFIG_PROGRESS=false
ENV NPM_CONFIG_LOGLEVEL=error

RUN npm ci --no-audit --prefer-offline
COPY . .

# Build with timeout protection
RUN timeout 600 npm run build || (echo "Build timed out after 10 minutes" && exit 1)

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 sveltekit

COPY --from=deps --chown=sveltekit:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=sveltekit:nodejs /app/build ./build
COPY --from=builder --chown=sveltekit:nodejs /app/package.json ./package.json

USER sveltekit
EXPOSE 3000
ENV PORT=3000

CMD ["node", "build"] 