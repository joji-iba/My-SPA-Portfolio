package database

import (
	"errors"
	"fmt"
	"log"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// noop はエラー時に返す安全なクリーンアップ関数。
// defer cleanup() がパニックしないことをAPI契約として保証する。
var noop = func() {}

// PoolConfig はDB接続プールの設定を保持する。
type PoolConfig struct {
	MaxOpenConns    int
	MaxIdleConns    int
	ConnMaxLifetime time.Duration
	ConnMaxIdleTime time.Duration
}

// DefaultPoolConfig は本番推奨のプール設定を返す。
func DefaultPoolConfig() PoolConfig {
	return PoolConfig{
		MaxOpenConns:    25,
		MaxIdleConns:    5,
		ConnMaxLifetime: 5 * time.Minute,
		ConnMaxIdleTime: 30 * time.Second,
	}
}

// Connect はPostgreSQLに接続し、接続プールを設定して返す。
// 戻り値の cleanup 関数を defer で呼ぶことでDB接続を安全にクローズできる。
// エラー時もcleanupは安全に呼び出し可能（no-op）。
func Connect(databaseURL string) (*gorm.DB, func(), error) {
	if databaseURL == "" {
		return nil, noop, errors.New("database URL is empty")
	}

	log.Println("Connecting to database...")

	db, err := gorm.Open(postgres.Open(databaseURL), &gorm.Config{})
	if err != nil {
		return nil, noop, err
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, noop, err
	}

	// 接続確認: gorm.Open は遅延接続のため、Ping で実際の疎通を検証
	if err := sqlDB.Ping(); err != nil {
		sqlDB.Close()
		return nil, noop, fmt.Errorf("database ping failed: %w", err)
	}

	pool := DefaultPoolConfig()
	sqlDB.SetMaxOpenConns(pool.MaxOpenConns)
	sqlDB.SetMaxIdleConns(pool.MaxIdleConns)
	sqlDB.SetConnMaxLifetime(pool.ConnMaxLifetime)
	sqlDB.SetConnMaxIdleTime(pool.ConnMaxIdleTime)

	cleanup := func() {
		if err := sqlDB.Close(); err != nil {
			log.Printf("failed to close database connection: %v", err)
		}
	}

	return db, cleanup, nil
}

// Migrate はDBスキーマのAutoMigrateを実行する。
// モデルは呼び出し側から渡すことで、databaseパッケージがドメインモデルに依存しない。
func Migrate(db *gorm.DB, models ...interface{}) error {
	if db == nil {
		return errors.New("db is nil")
	}
	if err := db.AutoMigrate(models...); err != nil {
		return err
	}
	log.Println("スキーマのマイグレーションが完了しました")
	return nil
}
