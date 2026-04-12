// HTTPリクエスト/レスポンスの処理を担当する
// エンドポイントの定義、リクエストのバリデーション、パラメータの解析、レスポンスの形式化、エラーハンドリング、HTTPステータスコードの設定
package handlers

import (
	"net/http"
	"strconv"

	"portfolio/backend/internal/models"

	"github.com/gin-gonic/gin"
)

// ProjectServicer はHandler層が必要とするService操作を定義する。
// Goの慣習に従い、使う側（consumer）がinterfaceを定義する。
type ProjectServicer interface {
	GetAllProjects() ([]models.Project, error)
	GetFeaturedProjects() ([]models.Project, error)
	GetProjectByID(id uint) (*models.Project, error)
}

type ProjectHandler struct {
	service ProjectServicer
}

func NewProjectHandler(service ProjectServicer) *ProjectHandler {
	return &ProjectHandler{service: service}
}

func (h *ProjectHandler) GetAllProjects(c *gin.Context) {
	projects, err := h.service.GetAllProjects()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, projects)
}

func (h *ProjectHandler) GetFeaturedProjects(c *gin.Context) {
	projects, err := h.service.GetFeaturedProjects()
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

	project, err := h.service.GetProjectByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}
	c.JSON(http.StatusOK, project)
}
