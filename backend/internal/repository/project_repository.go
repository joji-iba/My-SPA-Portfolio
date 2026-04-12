// データの永続化、 DBとの通信を担当する
package repository

import (
	"context"
	"log"
	"portfolio/backend/internal/models"

	"gorm.io/gorm"
)

type ProjectRepository struct {
	db *gorm.DB
}

func NewProjectRepository(db *gorm.DB) *ProjectRepository {
	return &ProjectRepository{db: db}
}

// projects一覧取得
func (r *ProjectRepository) GetAllProjects(ctx context.Context) ([]models.Project, error) {
	var projects []models.Project
	err := r.db.WithContext(ctx).Find(&projects).Error
	if err != nil {
		log.Printf("Error fetching all projects: %v", err)
		return nil, err
	}
	log.Printf("Successfully fetched %d projects", len(projects))
	return projects, nil
}

// featured projectの取得
func (r *ProjectRepository) GetFeaturedProjects(ctx context.Context) ([]models.Project, error) {
	var projects []models.Project
	err := r.db.WithContext(ctx).Where("featured = ?", true).Find(&projects).Error
	if err != nil {
		log.Printf("Error fetching featured projects: %v", err)
		return nil, err
	}
	log.Printf("Successfully fetched %d featured projects", len(projects))
	return projects, nil
}

// 特定のproject取得
func (r *ProjectRepository) GetProjectByID(ctx context.Context, id uint) (*models.Project, error) {
	var project models.Project
	err := r.db.WithContext(ctx).First(&project, id).Error
	if err != nil {
		log.Printf("Error fetching project with ID %d: %v", id, err)
		return nil, err
	}
	log.Printf("Successfully fetched project with ID %d", id)
	return &project, nil
}
