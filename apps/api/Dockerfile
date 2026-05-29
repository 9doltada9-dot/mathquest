FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/types/package*.json ./packages/types/
COPY packages/database/package*.json ./packages/database/
COPY packages/utils/package*.json ./packages/utils/
RUN npm ci

# Copy source
COPY . .

# Generate Prisma client
RUN cd packages/database && npx prisma generate

# Build
RUN npm run build --filter=@mathquest/api

# Production image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/apps/api/dist ./apps/api/dist
COPY --from=base /app/packages ./packages

EXPOSE 3001
CMD ["node", "apps/api/dist/main"]
