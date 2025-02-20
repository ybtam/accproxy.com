FROM node:22-alpine AS base
RUN apk update
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# Set working directory
WORKDIR /app

FROM base AS builder
RUN pnpm add -g turbo@^2
COPY . .
RUN turbo prune --scope=helm-api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
RUN pnpm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo run build --filter=helm-api

FROM base AS runner
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

COPY --from=installer /app/turbo.json ./turbo.json
COPY --from=installer /app/node_modules/ ./node_modules/

COPY --from=installer /app/apps/helm/api/package.json ./apps/helm/api/package.json

COPY --from=installer --chown=nodejs:nodejs /app/apps/helm/api/dist ./apps/helm/api/
COPY --from=installer --chown=nodejs:nodejs /app/apps/helm/api/node_modules/ ./apps/helm/api/node_modules/

EXPOSE 4000
ENV PORT=4000

ARG DB_HOST
ENV DB_HOST=$DB_HOST
ARG DB_USERNAME
ENV DB_USERNAME=$DB_USERNAME
ARG DB_PASSWORD
ENV DB_PASSWORD=$DB_PASSWORD
ARG DB_NAME
ENV DB_NAME=$DB_NAME
ARG JWT_TOKEN
ENV JWT_TOKEN=$JWT_TOKEN

RUN ls

CMD ["node", "apps/helm/api/src/index.js"]
