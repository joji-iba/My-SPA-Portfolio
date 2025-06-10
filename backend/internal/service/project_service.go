// ビジネスロジックを担当する
// 複数のリポジトリの組み合わせ、ビジネスルールの適用、データの加工や検証、トランザクション境界の定義
package service

import (
	"portfolio/backend/internal/models"
	"portfolio/backend/internal/repository"
)

type ProjectService struct {
	repo *repository.ProjectRepository
}

func NewProjectService(repo *repository.ProjectRepository) *ProjectService {
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
