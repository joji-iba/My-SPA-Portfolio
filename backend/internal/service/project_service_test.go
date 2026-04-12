package service

import (
	"context"
	"errors"
	"testing"

	"portfolio/backend/internal/models"
)

// mockProjectRepository は ProjectRepository interface のモック実装
type mockProjectRepository struct {
	getAllFunc     func(ctx context.Context) ([]models.Project, error)
	getFeaturedFunc func(ctx context.Context) ([]models.Project, error)
	getByIDFunc    func(ctx context.Context, id uint) (*models.Project, error)
}

func (m *mockProjectRepository) GetAllProjects(ctx context.Context) ([]models.Project, error) {
	return m.getAllFunc(ctx)
}

func (m *mockProjectRepository) GetFeaturedProjects(ctx context.Context) ([]models.Project, error) {
	return m.getFeaturedFunc(ctx)
}

func (m *mockProjectRepository) GetProjectByID(ctx context.Context, id uint) (*models.Project, error) {
	return m.getByIDFunc(ctx, id)
}

func TestGetAllProjects(t *testing.T) {
	tests := []struct {
		name      string
		mockRepo  *mockProjectRepository
		wantCount int
		wantErr   bool
	}{
		{
			name: "正常系: プロジェクト一覧を取得できる",
			mockRepo: &mockProjectRepository{
				getAllFunc: func(ctx context.Context) ([]models.Project, error) {
					return []models.Project{
						{ID: 1, Title: "Project 1"},
						{ID: 2, Title: "Project 2"},
					}, nil
				},
			},
			wantCount: 2,
			wantErr:   false,
		},
		{
			name: "正常系: プロジェクトが0件の場合",
			mockRepo: &mockProjectRepository{
				getAllFunc: func(ctx context.Context) ([]models.Project, error) {
					return []models.Project{}, nil
				},
			},
			wantCount: 0,
			wantErr:   false,
		},
		{
			name: "異常系: Repositoryがエラーを返す",
			mockRepo: &mockProjectRepository{
				getAllFunc: func(ctx context.Context) ([]models.Project, error) {
					return nil, errors.New("db connection failed")
				},
			},
			wantCount: 0,
			wantErr:   true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			svc := NewProjectService(tt.mockRepo)
			projects, err := svc.GetAllProjects(context.Background())

			if (err != nil) != tt.wantErr {
				t.Errorf("GetAllProjects() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !tt.wantErr && len(projects) != tt.wantCount {
				t.Errorf("GetAllProjects() count = %d, want %d", len(projects), tt.wantCount)
			}
		})
	}
}

func TestGetFeaturedProjects(t *testing.T) {
	tests := []struct {
		name      string
		mockRepo  *mockProjectRepository
		wantCount int
		wantErr   bool
	}{
		{
			name: "正常系: Featuredプロジェクトを取得できる",
			mockRepo: &mockProjectRepository{
				getFeaturedFunc: func(ctx context.Context) ([]models.Project, error) {
					return []models.Project{
						{ID: 1, Title: "Featured 1", Featured: true},
					}, nil
				},
			},
			wantCount: 1,
			wantErr:   false,
		},
		{
			name: "異常系: Repositoryがエラーを返す",
			mockRepo: &mockProjectRepository{
				getFeaturedFunc: func(ctx context.Context) ([]models.Project, error) {
					return nil, errors.New("db error")
				},
			},
			wantCount: 0,
			wantErr:   true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			svc := NewProjectService(tt.mockRepo)
			projects, err := svc.GetFeaturedProjects(context.Background())

			if (err != nil) != tt.wantErr {
				t.Errorf("GetFeaturedProjects() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !tt.wantErr && len(projects) != tt.wantCount {
				t.Errorf("GetFeaturedProjects() count = %d, want %d", len(projects), tt.wantCount)
			}
		})
	}
}

func TestGetProjectByID(t *testing.T) {
	tests := []struct {
		name    string
		id      uint
		mockRepo *mockProjectRepository
		wantID  uint
		wantErr bool
	}{
		{
			name: "正常系: IDでプロジェクトを取得できる",
			id:   1,
			mockRepo: &mockProjectRepository{
				getByIDFunc: func(ctx context.Context, id uint) (*models.Project, error) {
					return &models.Project{ID: id, Title: "Test Project"}, nil
				},
			},
			wantID:  1,
			wantErr: false,
		},
		{
			name: "異常系: 存在しないID",
			id:   9999,
			mockRepo: &mockProjectRepository{
				getByIDFunc: func(ctx context.Context, id uint) (*models.Project, error) {
					return nil, errors.New("record not found")
				},
			},
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			svc := NewProjectService(tt.mockRepo)
			project, err := svc.GetProjectByID(context.Background(), tt.id)

			if (err != nil) != tt.wantErr {
				t.Errorf("GetProjectByID() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !tt.wantErr && project.ID != tt.wantID {
				t.Errorf("GetProjectByID() ID = %d, want %d", project.ID, tt.wantID)
			}
		})
	}
}
