package config

import (
	"os"
	"testing"
)

func TestLoad_DefaultValues(t *testing.T) {
	// 環境変数をクリア
	os.Unsetenv("PORT")
	os.Unsetenv("DATABASE_URL")
	os.Unsetenv("GIN_MODE")
	os.Unsetenv("ALLOW_ORIGIN")

	cfg := Load()

	if cfg.Port != "8080" {
		t.Errorf("Port: got %q, want %q", cfg.Port, "8080")
	}
	if cfg.DatabaseURL != "" {
		t.Errorf("DatabaseURL: got %q, want empty", cfg.DatabaseURL)
	}
	if cfg.GinMode != "" {
		t.Errorf("GinMode: got %q, want empty", cfg.GinMode)
	}
	if cfg.AllowOrigin != "http://localhost:3000" {
		t.Errorf("AllowOrigin: got %q, want %q", cfg.AllowOrigin, "http://localhost:3000")
	}
}

func TestLoad_CustomValues(t *testing.T) {
	t.Setenv("PORT", "3000")
	t.Setenv("DATABASE_URL", "postgres://user:pass@localhost:5432/testdb")
	t.Setenv("GIN_MODE", "debug")
	t.Setenv("ALLOW_ORIGIN", "https://example.com")

	cfg := Load()

	if cfg.Port != "3000" {
		t.Errorf("Port: got %q, want %q", cfg.Port, "3000")
	}
	if cfg.DatabaseURL != "postgres://user:pass@localhost:5432/testdb" {
		t.Errorf("DatabaseURL: got %q, want set value", cfg.DatabaseURL)
	}
	if cfg.GinMode != "debug" {
		t.Errorf("GinMode: got %q, want %q", cfg.GinMode, "debug")
	}
	if cfg.AllowOrigin != "https://example.com" {
		t.Errorf("AllowOrigin: got %q, want %q", cfg.AllowOrigin, "https://example.com")
	}
}

func TestLoad_PartialOverride(t *testing.T) {
	os.Unsetenv("PORT")
	os.Unsetenv("ALLOW_ORIGIN")
	t.Setenv("DATABASE_URL", "postgres://localhost/mydb")

	cfg := Load()

	if cfg.Port != "8080" {
		t.Errorf("Port: got %q, want default %q", cfg.Port, "8080")
	}
	if cfg.DatabaseURL != "postgres://localhost/mydb" {
		t.Errorf("DatabaseURL: got %q, want set value", cfg.DatabaseURL)
	}
	if cfg.AllowOrigin != "http://localhost:3000" {
		t.Errorf("AllowOrigin: got %q, want default %q", cfg.AllowOrigin, "http://localhost:3000")
	}
}
