package config

import "os"

// Config はアプリケーション全体の設定を保持する構造体。
type Config struct {
	Port        string
	DatabaseURL string
	GinMode     string
	AllowOrigin string
}

// Load は環境変数から設定を読み込み、未設定の場合はデフォルト値を使用する。
func Load() *Config {
	return &Config{
		Port:        getEnvOrDefault("PORT", "8080"),
		DatabaseURL: os.Getenv("DATABASE_URL"),
		GinMode:     os.Getenv("GIN_MODE"),
		AllowOrigin: getEnvOrDefault("ALLOW_ORIGIN", "http://localhost:3000"),
	}
}

func getEnvOrDefault(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
