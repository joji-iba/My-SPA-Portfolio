# 開発・ビルドステージ
FROM node:20-alpine AS builder

WORKDIR /app

# 必要なビルドツールをインストール
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./

# sharpを先にインストール
RUN npm install --platform=linuxmusl --arch=x64 sharp

RUN npm install

COPY . .
RUN npm run build

# 本番実行用ステージ
FROM node:20-alpine AS runner

WORKDIR /app

# 本番に必要なファイルだけをコピー
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
