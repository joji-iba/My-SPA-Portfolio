package server

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"

	"portfolio/backend/internal/config"
)

func TestNewRouter_HasHealthEndpoint(t *testing.T) {
	cfg := &config.Config{
		GinMode:     gin.TestMode,
		AllowOrigin: "http://localhost:3000",
	}
	router := NewRouter(cfg)

	w := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/api/health", nil)
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("health status: got %d, want %d", w.Code, http.StatusOK)
	}

	var body map[string]string
	if err := json.Unmarshal(w.Body.Bytes(), &body); err != nil {
		t.Fatalf("failed to parse response: %v", err)
	}
	if body["status"] != "ok" {
		t.Errorf("health body: got %q, want %q", body["status"], "ok")
	}
}

func TestNewRouter_CORSHeaders(t *testing.T) {
	cfg := &config.Config{
		GinMode:     gin.TestMode,
		AllowOrigin: "https://mysite.com",
	}
	router := NewRouter(cfg)

	w := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/api/health", nil)
	router.ServeHTTP(w, req)

	got := w.Header().Get("Access-Control-Allow-Origin")
	if got != "https://mysite.com" {
		t.Errorf("CORS origin: got %q, want %q", got, "https://mysite.com")
	}
}

// mockHandler はテスト用のダミーハンドラ
type mockHandler struct {
	called map[string]bool
}

func newMockHandler() *mockHandler {
	return &mockHandler{called: make(map[string]bool)}
}

func (m *mockHandler) getAllProjects(c *gin.Context) {
	m.called["GetAllProjects"] = true
	c.JSON(http.StatusOK, gin.H{"route": "all"})
}

func (m *mockHandler) getFeaturedProjects(c *gin.Context) {
	m.called["GetFeaturedProjects"] = true
	c.JSON(http.StatusOK, gin.H{"route": "featured"})
}

func (m *mockHandler) getProjectByID(c *gin.Context) {
	m.called["GetProjectByID"] = true
	c.JSON(http.StatusOK, gin.H{"route": "byid"})
}

func TestRegisterProjectRoutes(t *testing.T) {
	cfg := &config.Config{GinMode: gin.TestMode, AllowOrigin: "http://localhost:3000"}
	router := NewRouter(cfg)
	mock := newMockHandler()

	RegisterProjectRoutes(router, mock.getAllProjects, mock.getFeaturedProjects, mock.getProjectByID)

	tests := []struct {
		name   string
		path   string
		method string
	}{
		{"GetAllProjects", "/api/projects", "GetAllProjects"},
		{"GetFeaturedProjects", "/api/projects/featured", "GetFeaturedProjects"},
		{"GetProjectByID", "/api/projects/1", "GetProjectByID"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			w := httptest.NewRecorder()
			req := httptest.NewRequest("GET", tt.path, nil)
			router.ServeHTTP(w, req)

			if w.Code != http.StatusOK {
				t.Errorf("%s: status got %d, want %d", tt.name, w.Code, http.StatusOK)
			}
			if !mock.called[tt.method] {
				t.Errorf("%s: handler was not called", tt.method)
			}
		})
	}
}

func TestNewRouter_UnknownRoute_Returns404(t *testing.T) {
	cfg := &config.Config{GinMode: gin.TestMode, AllowOrigin: "http://localhost:3000"}
	router := NewRouter(cfg)

	w := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/api/nonexistent", nil)
	router.ServeHTTP(w, req)

	if w.Code != http.StatusNotFound {
		t.Errorf("unknown route: got %d, want %d", w.Code, http.StatusNotFound)
	}
}
