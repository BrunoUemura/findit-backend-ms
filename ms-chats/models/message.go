package models

import (
	"time"

	"gorm.io/gorm"
)

type Message struct {
	ID           string `json:"id" gorm:"primaryKey"`
	ChatId       string `json:"chat_id"`
	Chat         Chat   `gorm:"foreignKey:ChatId"`
	SenderId     string `json:"sender_id"`
	Content      string `json:"content"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deleted"`
}
