package handlers

import "github.com/gin-gonic/gin"

// HealthHandler returns readiness state for ALB / health checks.
func HealthHandler(c *gin.Context) {
	c.JSON(200, gin.H{"status": "ok"})
}
