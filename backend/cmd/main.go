package main

import (
	"flag"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"

	"portfolio/backend/internal/handlers"
	"portfolio/backend/internal/models"
	"portfolio/backend/internal/repository"
	"portfolio/backend/internal/service"
)

func main() {
	// コマンドライン引数の解析
	shouldSeed := flag.Bool("seed", false, "シーダーデータを実行する")
	flag.Parse()

	// シーダー実行が指定された場合
	if *shouldSeed {
		seed()
		return
	}

	// Load .env file（ローカル開発用）。本番環境では環境変数を利用する。
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using environment variables")
	}

	// Setup Gin router
	r := gin.Default()

	// CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Routes
	api := r.Group("/api")

	// Health check endpoint は常に有効
	api.GET("/health", handlers.HealthHandler)

	// Database connection（存在する場合のみ初期化）
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Println("DATABASE_URL environment variable is not set; skipping DB initialization. /api/projects は利用できません。")
	} else {
		log.Printf("Connecting to database: %s", dbURL)

		db, err := gorm.Open("postgres", dbURL)
		if err != nil {
			log.Fatal("アプリケーション起動時にDB接続に失敗しました: ", err)
		}
		defer db.Close()

		// Auto migrate the schema
		if err := db.AutoMigrate(&models.Project{}).Error; err != nil {
			log.Fatal("スキーマのマイグレーションに失敗しました: ", err)
		}
		log.Println("スキーマのマイグレーションが完了しました")

		// Initialize dependencies
		projectRepo := repository.NewProjectRepository(db)
		projectService := service.NewProjectService(projectRepo)
		projectHandler := handlers.NewProjectHandler(projectService)

		// /api/projects 系のルートは DB がある場合のみ登録
		projects := api.Group("/projects")
		{
			projects.GET("", projectHandler.GetAllProjects)
			projects.GET("/featured", projectHandler.GetFeaturedProjects)
			projects.GET("/:id", projectHandler.GetProjectByID)
		}
	}

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}
