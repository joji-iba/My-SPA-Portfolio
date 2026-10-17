# 開発・ビルドステージ
FROM node:22-alpine AS base
# npm only bootstraps the pinned package manager; app dependencies use pnpm.
RUN npm install --global pnpm@12.14.0

FROM base AS builder

WORKDIR /app

# 必要なビルドツールをインストール
RUN apk add --no-cache python3 make g++

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# 本番実行用ステージ
FROM base AS runner

WORKDIR /app

# 本番に必要なファイルだけをコピー
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/node_modules node_modules

ENV NODE_ENV=production

EXPOSE 3000

CMD ["pnpm", "start"]
