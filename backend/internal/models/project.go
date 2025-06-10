// データベースのテーブルと同じ構造を持つ
package models

import (
	"time"
)

type Project struct {
	ID          uint      `json:"id" gorm:"primary_key"`
	Title       string    `json:"title" gorm:"not null"`
	Description string    `json:"description"`
	Type        string    `json:"type"`
	Image       string    `json:"image"`
	Link        string    `json:"link"`
	Github      string    `json:"github"`
	Featured    bool      `json:"featured" gorm:"default:false"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
