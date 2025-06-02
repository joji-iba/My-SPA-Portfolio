package main

import (
	"log"
	"os"

	"github.com/jinzhu/gorm"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"

	"portfolio/backend/internal/models"
)

func seed() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using environment variables")
	}

	// Database connection
	dbURL := os.Getenv("DATABASE_URL")
	db, err := gorm.Open("postgres", dbURL)
	if err != nil {
		log.Fatal("シーダー実行時にDB接続に失敗しました: ", err)
	}
	defer db.Close()

	// Auto migrate the schema
	db.AutoMigrate(&models.Project{})

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
