package database

import (
	"testing"
	"time"
)

func TestDefaultPoolConfig(t *testing.T) {
	cfg := DefaultPoolConfig()

	if cfg.MaxOpenConns != 25 {
		t.Errorf("MaxOpenConns: got %d, want 25", cfg.MaxOpenConns)
	}
	if cfg.MaxIdleConns != 5 {
		t.Errorf("MaxIdleConns: got %d, want 5", cfg.MaxIdleConns)
	}
	if cfg.ConnMaxLifetime != 5*time.Minute {
		t.Errorf("ConnMaxLifetime: got %v, want 5m", cfg.ConnMaxLifetime)
	}
	if cfg.ConnMaxIdleTime != 30*time.Second {
		t.Errorf("ConnMaxIdleTime: got %v, want 30s", cfg.ConnMaxIdleTime)
	}
}

func TestConnect_EmptyURL(t *testing.T) {
	_, cleanup, err := Connect("")
	if err == nil {
		t.Error("Connect with empty URL should return error")
	}
	// cleanup は nil ではなく no-op であること（defer cleanup() がパニックしない）
	cleanup()
}

func TestMigrate_NilDB(t *testing.T) {
	err := Migrate(nil)
	if err == nil {
		t.Error("Migrate with nil DB should return error")
	}
}
