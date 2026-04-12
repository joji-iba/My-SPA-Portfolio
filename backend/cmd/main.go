package main

import (
	"flag"
	"log"

	"github.com/joho/godotenv"

	"portfolio/backend/internal/config"
	"portfolio/backend/internal/database"
	"portfolio/backend/internal/handlers"
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

	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using environment variables")
	}

	cfg := config.Load()
	router := server.NewRouter(cfg)

	if cfg.DatabaseURL != "" {
		db, cleanup, err := database.Connect(cfg.DatabaseURL)
		if err != nil {
			log.Fatal("DB接続に失敗しました: ", err)
		}
		defer cleanup()

		if err := database.Migrate(db); err != nil {
			log.Fatal("マイグレーションに失敗しました: ", err)
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
		log.Fatal(err)
	}
}
