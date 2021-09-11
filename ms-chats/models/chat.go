package models

import (
	"time"

	"gorm.io/gorm"
)

type Chat struct {
	ID           string `json:"id" gorm:"primaryKey"`
	SenderId     string `json:"sender_id"`
	ReceiverId   string `json:"receiver_id"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deleted"`
}