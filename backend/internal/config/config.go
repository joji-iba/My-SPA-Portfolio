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
// 空文字列・空白のみのエントリは除外し、結果が空ならデフォルト値を返す。
// "*" は AllowCredentials: true と併用不可のため拒否する。
func parseCORSOrigins(raw string) []string {
	if raw == "" {
		return []string{"http://localhost:3000"}
	}
	parts := strings.Split(raw, ",")
	var origins []string
	for _, p := range parts {
		o := strings.TrimSpace(p)
		if o == "" {
			continue
		}
		if o == "*" {
			panic("CORS_ORIGINS must not contain '*' (incompatible with AllowCredentials)")
		}
		origins = append(origins, o)
	}
	if len(origins) == 0 {
		return []string{"http://localhost:3000"}
	}
	return origins
}
