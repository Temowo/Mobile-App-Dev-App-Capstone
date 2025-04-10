# Base stage
FROM node:18-alpine as base

RUN apk add --no-cache bash

RUN npm install -g pnpm@8.6.3 @nestjs/cli

# Development stage
FROM base as development

WORKDIR /usr/src/app

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN npx nest build

# Production stage
FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production --frozen-lockfile

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]