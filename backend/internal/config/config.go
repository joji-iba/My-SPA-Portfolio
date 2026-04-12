package config

import (
	"os"
	"strings"
)

// Config はアプリケーション全体の設定を保持する構造体。
type Config struct {
	Port        string
	DatabaseURL string
	GinMode     string
	CORSOrigins []string
}

// Load は環境変数から設定を読み込み、未設定の場合はデフォルト値を使用する。
func Load() *Config {
	return &Config{
		Port:        getEnvOrDefault("PORT", "8080"),
		DatabaseURL: os.Getenv("DATABASE_URL"),
		GinMode:     os.Getenv("GIN_MODE"),
		CORSOrigins: parseCORSOrigins(os.Getenv("CORS_ORIGINS")),
	}
}

func getEnvOrDefault(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

// parseCORSOrigins はカンマ区切りのオリジン文字列をスライスに変換する。
// 空文字列の場合はデフォルト値を返す。
func parseCORSOrigins(raw string) []string {
	if raw == "" {
		return []string{"http://localhost:3000"}
	}
	origins := strings.Split(raw, ",")
	for i := range origins {
		origins[i] = strings.TrimSpace(origins[i])
	}
	return origins
}
