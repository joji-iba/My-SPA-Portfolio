// HTTPリクエスト/レスポンスの処理を担当する
// エンドポイントの定義、リクエストのバリデーション、パラメータの解析、レスポンスの形式化、エラーハンドリング、HTTPステータスコードの設定
package handlers

import (
	"context"
	"net/http"
	"strconv"

	"portfolio/backend/internal/models"

	"github.com/gin-gonic/gin"
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
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, projects)
}

func (h *ProjectHandler) GetFeaturedProjects(c *gin.Context) {
	ctx := c.Request.Context()
	projects, err := h.service.GetFeaturedProjects(ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
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
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}
	c.JSON(http.StatusOK, project)
}
