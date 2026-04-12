package main

import (
	"flag"
	"fmt"
	"log"

	"github.com/joho/godotenv"

	"portfolio/backend/internal/config"
	"portfolio/backend/internal/database"
	"portfolio/backend/internal/handlers"
	"portfolio/backend/internal/models"
	"portfolio/backend/internal/repository"
	"portfolio/backend/internal/server"
	"portfolio/backend/internal/service"
)

func main() {
	shouldSeed := flag.Bool("seed", false, "シーダーデータを実行する")
	flag.Parse()

	if *shouldSeed {
		seed()
		return
	}

	if err := run(); err != nil {
		log.Fatal(err)
	}
}

// run はアプリケーションのメインロジックを実行する。
// main() から分離することで、defer が確実に実行される。
func run() error {
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using environment variables")
	}

	cfg := config.Load()
	router := server.NewRouter(cfg)

	if cfg.DatabaseURL != "" {
		db, cleanup, err := database.Connect(cfg.DatabaseURL)
		if err != nil {
			return fmt.Errorf("DB接続に失敗しました: %w", err)
		}
		defer cleanup()

		if err := database.Migrate(db, &models.Project{}); err != nil {
			return fmt.Errorf("マイグレーションに失敗しました: %w", err)
		}

		projectRepo := repository.NewProjectRepository(db)
		projectService := service.NewProjectService(projectRepo)
		projectHandler := handlers.NewProjectHandler(projectService)

		server.RegisterProjectRoutes(
			router,
			projectHandler.GetAllProjects,
			projectHandler.GetFeaturedProjects,
			projectHandler.GetProjectByID,
		)
	} else {
		log.Println("DATABASE_URL is not set; skipping DB initialization")
	}

	log.Printf("Server starting on port %s", cfg.Port)
	if err := router.Run(":" + cfg.Port); err != nil {
		return fmt.Errorf("サーバー起動に失敗しました: %w", err)
	}
	return nil
}
