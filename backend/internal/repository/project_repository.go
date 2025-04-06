package repository

import (
	"portfolio/backend/internal/models"

	"github.com/jinzhu/gorm"
)

type ProjectRepository struct {
	db *gorm.DB
}

func NewProjectRepository(db *gorm.DB) *ProjectRepository {
	return &ProjectRepository{db: db}
}

// projects一覧取得
func (r *ProjectRepository) GetAllProjects() ([]models.Project, error) {
	var projects []models.Project
	err := r.db.Find(&projects).Error
	return projects, err
}

// featured projectの取得
func (r *ProjectRepository) GetFeaturedProjects() ([]models.Project, error) {
	var projects []models.Project
	err := r.db.Where("featured = ?", true).Find(&projects).Error
	return projects, err
}

// 特定のproject取得
func (r *ProjectRepository) GetProjectByID(id uint) (*models.Project, error) {
	var project models.Project
	err := r.db.First(&project, id).Error
	if err != nil {
		return nil, err
	}
	return &project, nil
}
