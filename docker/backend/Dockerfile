# Stage 1: builder
FROM golang:1.25-alpine AS builder

WORKDIR /app/backend

# 依存関係用のパッケージをインストール
RUN apk add --no-cache git

# Go module 関連ファイルをコピー
COPY backend/go.mod backend/go.sum ./
RUN go mod download

# アプリケーションのソースをコピー
COPY backend/ ./

# ビルドしてバイナリファイル（main）を作成
RUN go build -o main ./cmd

# Stage 2: production runner
FROM alpine:latest

WORKDIR /app/backend

# 必要に応じて、環境変数や CA 証明書を追加
RUN apk add --no-cache ca-certificates

# ビルド済みのバイナリをコピー
COPY --from=builder /app/backend/main .

# ポート公開（必要に応じて）
EXPOSE 8080

# 実行コマンド
CMD ["./main"]
