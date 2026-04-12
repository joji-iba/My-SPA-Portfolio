package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"portfolio/backend/internal/models"
)

func seed() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using environment variables")
	}

	// Database connection
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Fatal("環境変数 DATABASE_URL が設定されていません。DB接続に失敗しました。")
	}
	db, err := gorm.Open(postgres.Open(dbURL), &gorm.Config{})
	if err != nil {
		log.Fatal("シーダー実行時にDB接続に失敗しました: ", err)
	}

	// GORM v2: *sql.DB を取得して defer Close
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("DB接続プールの取得に失敗しました: ", err)
	}
	defer sqlDB.Close()

	// Auto migrate the schema
	if err := db.AutoMigrate(&models.Project{}); err != nil {
		log.Fatal("マイグレーションに失敗しました: ", err)
	}

	// シーダーファイルを読み込む
	seedSQL, err := os.ReadFile("db/seed.sql")
	if err != nil {
		log.Fatal("シーダーファイルの読み込みに失敗しました: ", err)
	}

	// シーダーを実行
	if err := db.Exec(string(seedSQL)).Error; err != nil {
		log.Fatal("シーダーデータの実行に失敗しました: ", err)
	}

	log.Println("シーダーデータの投入が完了しました")
}
