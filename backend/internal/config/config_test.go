package config

import (
	"testing"
)

func TestLoad_DefaultValues(t *testing.T) {
	t.Setenv("PORT", "")
	t.Setenv("DATABASE_URL", "")
	t.Setenv("GIN_MODE", "")
	t.Setenv("CORS_ORIGINS", "")

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
	if len(cfg.CORSOrigins) != 1 || cfg.CORSOrigins[0] != "http://localhost:3000" {
		t.Errorf("CORSOrigins: got %v, want [http://localhost:3000]", cfg.CORSOrigins)
	}
}

func TestLoad_CustomValues(t *testing.T) {
	t.Setenv("PORT", "3000")
	t.Setenv("DATABASE_URL", "postgres://user:pass@localhost:5432/testdb")
	t.Setenv("GIN_MODE", "debug")
	t.Setenv("CORS_ORIGINS", "https://example.com")

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
	if len(cfg.CORSOrigins) != 1 || cfg.CORSOrigins[0] != "https://example.com" {
		t.Errorf("CORSOrigins: got %v, want [https://example.com]", cfg.CORSOrigins)
	}
}

func TestLoad_MultipleOrigins(t *testing.T) {
	t.Setenv("CORS_ORIGINS", "https://example.com, https://staging.example.com")

	cfg := Load()

	if len(cfg.CORSOrigins) != 2 {
		t.Fatalf("CORSOrigins length: got %d, want 2", len(cfg.CORSOrigins))
	}
	if cfg.CORSOrigins[0] != "https://example.com" {
		t.Errorf("CORSOrigins[0]: got %q, want %q", cfg.CORSOrigins[0], "https://example.com")
	}
	if cfg.CORSOrigins[1] != "https://staging.example.com" {
		t.Errorf("CORSOrigins[1]: got %q, want %q", cfg.CORSOrigins[1], "https://staging.example.com")
	}
}

func TestLoad_PartialOverride(t *testing.T) {
	t.Setenv("PORT", "")
	t.Setenv("CORS_ORIGINS", "")
	t.Setenv("DATABASE_URL", "postgres://localhost/mydb")

	cfg := Load()

	if cfg.Port != "8080" {
		t.Errorf("Port: got %q, want default %q", cfg.Port, "8080")
	}
	if cfg.DatabaseURL != "postgres://localhost/mydb" {
		t.Errorf("DatabaseURL: got %q, want set value", cfg.DatabaseURL)
	}
	if len(cfg.CORSOrigins) != 1 || cfg.CORSOrigins[0] != "http://localhost:3000" {
		t.Errorf("CORSOrigins: got %v, want default [http://localhost:3000]", cfg.CORSOrigins)
	}
}
