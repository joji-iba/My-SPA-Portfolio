# Stage 1: builder
FROM golang:1.23-alpine AS builder

WORKDIR /app

# 依存関係用のパッケージをインストール
RUN apk add --no-cache git

# Airをインストール（開発用）
RUN go install github.com/air-verse/air@latest

# PATH を通す（Go install は /go/bin に入る）
ENV PATH="/go/bin:$PATH"

# Go module 関連ファイルをコピー
COPY go.mod go.sum ./
RUN go mod download

# アプリケーションのソースをコピー
COPY . .

# ビルドしてバイナリファイル（main）を作成
RUN go build -o main ./cmd

# Stage 2: production runner
FROM alpine:latest

WORKDIR /app

# 必要に応じて、環境変数や CA 証明書を追加
RUN apk add --no-cache ca-certificates

# ビルド済みのバイナリをコピー
COPY --from=builder /app/main .
COPY --from=builder /app/.air.toml .

# ポート公開（必要に応じて）
EXPOSE 8080

# 実行コマンド
CMD ["./main"]
