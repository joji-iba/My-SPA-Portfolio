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

// newCORSRequest はCORSテスト用のリクエストを作成する。
// gin-contrib/cors は Origin と Host が一致すると同一オリジンと見なしスキップするため、
// Host を API サーバー側に明示的に設定する。
func newCORSRequest(method, path, origin string) *http.Request {
	req := httptest.NewRequest(method, path, nil)
	req.Header.Set("Origin", origin)
	req.Host = "api.localhost"
	return req
}

func TestCORS_AllowedOrigin(t *testing.T) {
	r := gin.New()
	r.Use(CORS([]string{"https://example.com"}))
	r.GET("/test", func(c *gin.Context) {
		c.String(http.StatusOK, "ok")
	})

	w := httptest.NewRecorder()
	r.ServeHTTP(w, newCORSRequest("GET", "/test", "https://example.com"))

	got := w.Header().Get("Access-Control-Allow-Origin")
	if got != "https://example.com" {
		t.Errorf("Allow-Origin: got %q, want %q", got, "https://example.com")
	}
	if w.Code != http.StatusOK {
		t.Errorf("status: got %d, want %d", w.Code, http.StatusOK)
	}
}

func TestCORS_PreflightSetsHeaders(t *testing.T) {
	r := gin.New()
	r.Use(CORS([]string{"https://example.com"}))
	r.GET("/test", func(c *gin.Context) {
		c.String(http.StatusOK, "should not reach here")
	})

	req := newCORSRequest("OPTIONS", "/test", "https://example.com")
	req.Header.Set("Access-Control-Request-Method", "GET")
	req.Header.Set("Access-Control-Request-Headers", "Content-Type")

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	got := w.Header().Get("Access-Control-Allow-Origin")
	if got != "https://example.com" {
		t.Errorf("preflight Allow-Origin: got %q, want %q", got, "https://example.com")
	}
}

func TestCORS_DisallowedOrigin(t *testing.T) {
	r := gin.New()
	r.Use(CORS([]string{"https://example.com"}))
	r.GET("/test", func(c *gin.Context) {
		c.String(http.StatusOK, "ok")
	})

	w := httptest.NewRecorder()
	r.ServeHTTP(w, newCORSRequest("GET", "/test", "https://evil.com"))

	if w.Code != http.StatusForbidden {
		t.Errorf("disallowed origin: got %d, want %d", w.Code, http.StatusForbidden)
	}
}

func TestCORS_MultipleOrigins(t *testing.T) {
	r := gin.New()
	r.Use(CORS([]string{"https://prod.com", "https://staging.com"}))
	r.GET("/test", func(c *gin.Context) {
		c.String(http.StatusOK, "ok")
	})

	tests := []struct {
		name       string
		origin     string
		wantOrigin string
		wantStatus int
	}{
		{"prod allowed", "https://prod.com", "https://prod.com", http.StatusOK},
		{"staging allowed", "https://staging.com", "https://staging.com", http.StatusOK},
		{"unknown denied", "https://evil.com", "", http.StatusForbidden},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			w := httptest.NewRecorder()
			r.ServeHTTP(w, newCORSRequest("GET", "/test", tt.origin))

			got := w.Header().Get("Access-Control-Allow-Origin")
			if got != tt.wantOrigin {
				t.Errorf("origin %q: got Allow-Origin %q, want %q", tt.origin, got, tt.wantOrigin)
			}
			if w.Code != tt.wantStatus {
				t.Errorf("origin %q: got status %d, want %d", tt.origin, w.Code, tt.wantStatus)
			}
		})
	}
}

func TestCORS_CredentialsHeader(t *testing.T) {
	r := gin.New()
	r.Use(CORS([]string{"https://example.com"}))
	r.GET("/test", func(c *gin.Context) {
		c.String(http.StatusOK, "ok")
	})

	w := httptest.NewRecorder()
	r.ServeHTTP(w, newCORSRequest("GET", "/test", "https://example.com"))

	got := w.Header().Get("Access-Control-Allow-Credentials")
	if got != "true" {
		t.Errorf("Allow-Credentials: got %q, want %q", got, "true")
	}
}
