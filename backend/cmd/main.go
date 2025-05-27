package main

import (
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
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using environment variables")
	}

	// Database connection
	dbURL := os.Getenv("DATABASE_URL")
	db, err := gorm.Open("postgres", dbURL)
	if err != nil {
		log.Fatal("DB接続に失敗しました: ", err)
	}
	defer db.Close()

	// Auto migrate the schema
	db.AutoMigrate(&models.Project{})

	// Initialize dependencies
	projectRepo := repository.NewProjectRepository(db)
	projectService := service.NewProjectService(projectRepo)
	projectHandler := handlers.NewProjectHandler(projectService)

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
	{
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

	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}
