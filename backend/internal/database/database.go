package database

import (
	"errors"
	"log"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"portfolio/backend/internal/models"
)

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
func Connect(databaseURL string) (*gorm.DB, func(), error) {
	if databaseURL == "" {
		return nil, nil, errors.New("database URL is empty")
	}

	log.Println("Connecting to database...")

	db, err := gorm.Open(postgres.Open(databaseURL), &gorm.Config{})
	if err != nil {
		return nil, nil, err
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, nil, err
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
func Migrate(db *gorm.DB) error {
	if db == nil {
		return errors.New("db is nil")
	}
	if err := db.AutoMigrate(&models.Project{}); err != nil {
		return err
	}
	log.Println("スキーマのマイグレーションが完了しました")
	return nil
}
