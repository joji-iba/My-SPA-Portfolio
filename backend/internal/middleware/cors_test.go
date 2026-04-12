package middleware

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func init() {
	gin.SetMode(gin.TestMode)
}

func TestCORS_SetsHeaders(t *testing.T) {
	r := gin.New()
	r.Use(CORS("https://example.com"))
	r.GET("/test", func(c *gin.Context) {
		c.String(http.StatusOK, "ok")
	})

	w := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/test", nil)
	r.ServeHTTP(w, req)

	tests := []struct {
		header string
		want   string
	}{
		{"Access-Control-Allow-Origin", "https://example.com"},
		{"Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"},
		{"Access-Control-Allow-Headers", "Content-Type, Authorization"},
	}
	for _, tt := range tests {
		got := w.Header().Get(tt.header)
		if got != tt.want {
			t.Errorf("%s: got %q, want %q", tt.header, got, tt.want)
		}
	}

	if w.Code != http.StatusOK {
		t.Errorf("status: got %d, want %d", w.Code, http.StatusOK)
	}
}

func TestCORS_PreflightReturns204(t *testing.T) {
	r := gin.New()
	r.Use(CORS("https://example.com"))
	r.GET("/test", func(c *gin.Context) {
		c.String(http.StatusOK, "should not reach here")
	})

	w := httptest.NewRecorder()
	req := httptest.NewRequest("OPTIONS", "/test", nil)
	r.ServeHTTP(w, req)

	if w.Code != http.StatusNoContent {
		t.Errorf("OPTIONS status: got %d, want %d", w.Code, http.StatusNoContent)
	}

	if w.Body.String() != "" {
		t.Errorf("OPTIONS body should be empty, got %q", w.Body.String())
	}
}

func TestCORS_DifferentOrigin(t *testing.T) {
	r := gin.New()
	r.Use(CORS("http://localhost:3000"))
	r.GET("/test", func(c *gin.Context) {
		c.String(http.StatusOK, "ok")
	})

	w := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/test", nil)
	r.ServeHTTP(w, req)

	got := w.Header().Get("Access-Control-Allow-Origin")
	if got != "http://localhost:3000" {
		t.Errorf("Origin: got %q, want %q", got, "http://localhost:3000")
	}
}
