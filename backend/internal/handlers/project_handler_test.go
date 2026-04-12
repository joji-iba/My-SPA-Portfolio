package handlers

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"testing"

	"portfolio/backend/internal/models"

	"github.com/gin-gonic/gin"
)

// mockProjectService は ProjectServicer interface のモック実装
type mockProjectService struct {
	getAllFunc     func(ctx context.Context) ([]models.Project, error)
	getFeaturedFunc func(ctx context.Context) ([]models.Project, error)
	getByIDFunc    func(ctx context.Context, id uint) (*models.Project, error)
}

func (m *mockProjectService) GetAllProjects(ctx context.Context) ([]models.Project, error) {
	return m.getAllFunc(ctx)
}

func (m *mockProjectService) GetFeaturedProjects(ctx context.Context) ([]models.Project, error) {
	return m.getFeaturedFunc(ctx)
}

func (m *mockProjectService) GetProjectByID(ctx context.Context, id uint) (*models.Project, error) {
	return m.getByIDFunc(ctx, id)
}

func setupRouter(handler *ProjectHandler) *gin.Engine {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	api := r.Group("/api/projects")
	{
		api.GET("", handler.GetAllProjects)
		api.GET("/featured", handler.GetFeaturedProjects)
		api.GET("/:id", handler.GetProjectByID)
	}
	return r
}

func TestProjectHandler_GetAllProjects(t *testing.T) {
	tests := []struct {
		name       string
		mockSvc    *mockProjectService
		wantStatus int
		wantCount  int
	}{
		{
			name: "正常系: プロジェクト一覧を返す",
			mockSvc: &mockProjectService{
				getAllFunc: func(ctx context.Context) ([]models.Project, error) {
					return []models.Project{
						{ID: 1, Title: "Project 1"},
						{ID: 2, Title: "Project 2"},
					}, nil
				},
			},
			wantStatus: http.StatusOK,
			wantCount:  2,
		},
		{
			name: "異常系: Service層エラーで500を返す",
			mockSvc: &mockProjectService{
				getAllFunc: func(ctx context.Context) ([]models.Project, error) {
					return nil, errors.New("db error")
				},
			},
			wantStatus: http.StatusInternalServerError,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			handler := NewProjectHandler(tt.mockSvc)
			r := setupRouter(handler)

			req := httptest.NewRequest(http.MethodGet, "/api/projects", nil)
			w := httptest.NewRecorder()
			r.ServeHTTP(w, req)

			if w.Code != tt.wantStatus {
				t.Errorf("status = %d, want %d", w.Code, tt.wantStatus)
			}

			if tt.wantStatus == http.StatusOK {
				var projects []models.Project
				if err := json.Unmarshal(w.Body.Bytes(), &projects); err != nil {
					t.Fatalf("failed to decode response: %v", err)
				}
				if len(projects) != tt.wantCount {
					t.Errorf("count = %d, want %d", len(projects), tt.wantCount)
				}
			}
		})
	}
}

func TestProjectHandler_GetFeaturedProjects(t *testing.T) {
	tests := []struct {
		name       string
		mockSvc    *mockProjectService
		wantStatus int
		wantCount  int
	}{
		{
			name: "正常系: Featuredプロジェクトを返す",
			mockSvc: &mockProjectService{
				getFeaturedFunc: func(ctx context.Context) ([]models.Project, error) {
					return []models.Project{
						{ID: 1, Title: "Featured", Featured: true},
					}, nil
				},
			},
			wantStatus: http.StatusOK,
			wantCount:  1,
		},
		{
			name: "異常系: Service層エラーで500を返す",
			mockSvc: &mockProjectService{
				getFeaturedFunc: func(ctx context.Context) ([]models.Project, error) {
					return nil, errors.New("db error")
				},
			},
			wantStatus: http.StatusInternalServerError,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			handler := NewProjectHandler(tt.mockSvc)
			r := setupRouter(handler)

			req := httptest.NewRequest(http.MethodGet, "/api/projects/featured", nil)
			w := httptest.NewRecorder()
			r.ServeHTTP(w, req)

			if w.Code != tt.wantStatus {
				t.Errorf("status = %d, want %d", w.Code, tt.wantStatus)
			}

			if tt.wantStatus == http.StatusOK {
				var projects []models.Project
				if err := json.Unmarshal(w.Body.Bytes(), &projects); err != nil {
					t.Fatalf("failed to decode response: %v", err)
				}
				if len(projects) != tt.wantCount {
					t.Errorf("count = %d, want %d", len(projects), tt.wantCount)
				}
			}
		})
	}
}

func TestProjectHandler_GetProjectByID(t *testing.T) {
	tests := []struct {
		name       string
		path       string
		mockSvc    *mockProjectService
		wantStatus int
		wantTitle  string
	}{
		{
			name: "正常系: IDでプロジェクトを取得",
			path: "/api/projects/1",
			mockSvc: &mockProjectService{
				getByIDFunc: func(ctx context.Context, id uint) (*models.Project, error) {
					return &models.Project{ID: 1, Title: "Test Project"}, nil
				},
			},
			wantStatus: http.StatusOK,
			wantTitle:  "Test Project",
		},
		{
			name: "異常系: 不正なIDでBadRequest",
			path: "/api/projects/abc",
			mockSvc: &mockProjectService{
				getByIDFunc: func(ctx context.Context, id uint) (*models.Project, error) {
					return nil, nil
				},
			},
			wantStatus: http.StatusBadRequest,
		},
		{
			name: "異常系: 存在しないIDでNotFound",
			path: "/api/projects/9999",
			mockSvc: &mockProjectService{
				getByIDFunc: func(ctx context.Context, id uint) (*models.Project, error) {
					return nil, errors.New("record not found")
				},
			},
			wantStatus: http.StatusNotFound,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			handler := NewProjectHandler(tt.mockSvc)
			r := setupRouter(handler)

			req := httptest.NewRequest(http.MethodGet, tt.path, nil)
			w := httptest.NewRecorder()
			r.ServeHTTP(w, req)

			if w.Code != tt.wantStatus {
				t.Errorf("status = %d, want %d", w.Code, tt.wantStatus)
			}

			if tt.wantStatus == http.StatusOK {
				var project models.Project
				if err := json.Unmarshal(w.Body.Bytes(), &project); err != nil {
					t.Fatalf("failed to decode response: %v", err)
				}
				if project.Title != tt.wantTitle {
					t.Errorf("title = %q, want %q", project.Title, tt.wantTitle)
				}
			}
		})
	}
}

func TestProjectHandler_CancelledContext(t *testing.T) {
	t.Run("キャンセルされたリクエストでService層にキャンセル済みContextが伝播する", func(t *testing.T) {
		var receivedCtx context.Context
		mockSvc := &mockProjectService{
			getAllFunc: func(ctx context.Context) ([]models.Project, error) {
				receivedCtx = ctx
				return nil, ctx.Err()
			},
			getFeaturedFunc: func(ctx context.Context) ([]models.Project, error) { return nil, nil },
			getByIDFunc:     func(ctx context.Context, id uint) (*models.Project, error) { return nil, nil },
		}

		handler := NewProjectHandler(mockSvc)
		r := setupRouter(handler)

		ctx, cancel := context.WithCancel(context.Background())
		cancel()
		req := httptest.NewRequest(http.MethodGet, "/api/projects", nil).WithContext(ctx)
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		if receivedCtx == nil {
			t.Fatal("service was not called")
		}
		if receivedCtx.Err() != context.Canceled {
			t.Errorf("expected cancelled context in service, got err=%v", receivedCtx.Err())
		}
	})

	t.Run("Handlerに渡されるContextがnilでないことを検証する", func(t *testing.T) {
		mockSvc := &mockProjectService{
			getAllFunc: func(ctx context.Context) ([]models.Project, error) {
				if ctx == nil {
					t.Fatal("context must not be nil")
				}
				return []models.Project{}, nil
			},
			getFeaturedFunc: func(ctx context.Context) ([]models.Project, error) { return nil, nil },
			getByIDFunc:     func(ctx context.Context, id uint) (*models.Project, error) { return nil, nil },
		}

		handler := NewProjectHandler(mockSvc)
		r := setupRouter(handler)

		req := httptest.NewRequest(http.MethodGet, "/api/projects", nil)
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		if w.Code != http.StatusOK {
			t.Errorf("status = %d, want %d", w.Code, http.StatusOK)
		}
	})
}
