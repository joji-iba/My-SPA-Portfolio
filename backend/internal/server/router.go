package server

import (
	"github.com/gin-gonic/gin"

	"portfolio/backend/internal/config"
	"portfolio/backend/internal/handlers"
	"portfolio/backend/internal/middleware"
)

// NewRouter はGinルーターを初期化し、共通ミドルウェアとヘルスチェックを登録する。
func NewRouter(cfg *config.Config) *gin.Engine {
	if cfg.GinMode == "" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()
	r.Use(middleware.CORS(cfg.AllowOrigin))

	api := r.Group("/api")
	api.GET("/health", handlers.HealthHandler)

	return r
}

// RegisterProjectRoutes は /api/projects 系のルートを登録する。
// gin.HandlerFunc を直接受け取ることで、server パッケージが具体的なhandler型に依存しない。
func RegisterProjectRoutes(r *gin.Engine, getAll, getFeatured, getByID gin.HandlerFunc) {
	projects := r.Group("/api/projects")
	{
		projects.GET("", getAll)
		projects.GET("/featured", getFeatured)
		projects.GET("/:id", getByID)
	}
}
