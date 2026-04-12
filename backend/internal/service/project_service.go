// ビジネスロジックを担当する
// 複数のリポジトリの組み合わせ、ビジネスルールの適用、データの加工や検証、トランザクション境界の定義
package service

import (
	"portfolio/backend/internal/models"
)

// ProjectRepository はService層が必要とするRepository操作を定義する。
// Goの慣習に従い、使う側（consumer）がinterfaceを定義する。
type ProjectRepository interface {
	GetAllProjects() ([]models.Project, error)
	GetFeaturedProjects() ([]models.Project, error)
	GetProjectByID(id uint) (*models.Project, error)
}

type ProjectService struct {
	repo ProjectRepository
}

func NewProjectService(repo ProjectRepository) *ProjectService {
	return &ProjectService{repo: repo}
}

func (s *ProjectService) GetAllProjects() ([]models.Project, error) {
	return s.repo.GetAllProjects()
}

func (s *ProjectService) GetFeaturedProjects() ([]models.Project, error) {
	return s.repo.GetFeaturedProjects()
}

func (s *ProjectService) GetProjectByID(id uint) (*models.Project, error) {
	return s.repo.GetProjectByID(id)
}
