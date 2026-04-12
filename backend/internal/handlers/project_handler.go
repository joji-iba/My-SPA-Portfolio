// HTTPリクエスト/レスポンスの処理を担当する
// エンドポイントの定義、リクエストのバリデーション、パラメータの解析、レスポンスの形式化、エラーハンドリング、HTTPステータスコードの設定
package handlers

import (
	"context"
	"errors"
	"log"
	"net/http"
	"strconv"

	"portfolio/backend/internal/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// ProjectServicer はHandler層が必要とするService操作を定義する。
// Goの慣習に従い、使う側（consumer）がinterfaceを定義する。
type ProjectServicer interface {
	GetAllProjects(ctx context.Context) ([]models.Project, error)
	GetFeaturedProjects(ctx context.Context) ([]models.Project, error)
	GetProjectByID(ctx context.Context, id uint) (*models.Project, error)
}

type ProjectHandler struct {
	service ProjectServicer
}

func NewProjectHandler(service ProjectServicer) *ProjectHandler {
	return &ProjectHandler{service: service}
}

func (h *ProjectHandler) GetAllProjects(c *gin.Context) {
	ctx := c.Request.Context()
	projects, err := h.service.GetAllProjects(ctx)
	if err != nil {
		handleServiceError(c, err, "GetAllProjects")
		return
	}
	c.JSON(http.StatusOK, projects)
}

func (h *ProjectHandler) GetFeaturedProjects(c *gin.Context) {
	ctx := c.Request.Context()
	projects, err := h.service.GetFeaturedProjects(ctx)
	if err != nil {
		handleServiceError(c, err, "GetFeaturedProjects")
		return
	}
	c.JSON(http.StatusOK, projects)
}

func (h *ProjectHandler) GetProjectByID(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid project ID"})
		return
	}

	ctx := c.Request.Context()
	project, err := h.service.GetProjectByID(ctx, uint(id))
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
			return
		}
		handleServiceError(c, err, "GetProjectByID")
		return
	}
	c.JSON(http.StatusOK, project)
}

// handleServiceError は内部エラーをログに出力し、クライアントには汎用メッセージのみ返す。
func handleServiceError(c *gin.Context, err error, operation string) {
	if errors.Is(err, context.Canceled) {
		log.Printf("[%s] request cancelled by client", operation)
		c.JSON(499, gin.H{"error": "Client closed request"})
		return
	}
	if errors.Is(err, context.DeadlineExceeded) {
		log.Printf("[%s] request timeout: %v", operation, err)
		c.JSON(http.StatusGatewayTimeout, gin.H{"error": "Request timeout"})
		return
	}
	log.Printf("[%s] internal error: %v", operation, err)
	c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
}
