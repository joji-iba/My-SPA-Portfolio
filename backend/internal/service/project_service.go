// ビジネスロジックを担当する
// 複数のリポジトリの組み合わせ、ビジネスルールの適用、データの加工や検証、トランザクション境界の定義
package service

import (
	"context"

	"portfolio/backend/internal/models"
)

// ProjectRepository はService層が必要とするRepository操作を定義する。
// Goの慣習に従い、使う側（consumer）がinterfaceを定義する。
type ProjectRepository interface {
	GetAllProjects(ctx context.Context) ([]models.Project, error)
	GetFeaturedProjects(ctx context.Context) ([]models.Project, error)
	GetProjectByID(ctx context.Context, id uint) (*models.Project, error)
}

type ProjectService struct {
	repo ProjectRepository
}

func NewProjectService(repo ProjectRepository) *ProjectService {
	return &ProjectService{repo: repo}
}

func (s *ProjectService) GetAllProjects(ctx context.Context) ([]models.Project, error) {
	return s.repo.GetAllProjects(ctx)
}

func (s *ProjectService) GetFeaturedProjects(ctx context.Context) ([]models.Project, error) {
	return s.repo.GetFeaturedProjects(ctx)
}

func (s *ProjectService) GetProjectByID(ctx context.Context, id uint) (*models.Project, error) {
	return s.repo.GetProjectByID(ctx, id)
}
