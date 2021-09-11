package models

import (
	"errors"
	"time"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

type Message struct {
	ID           string `json:"id" gorm:"column:id;" sql:"type:uuid;primary_key;default:uuid_generate_v4()"`
	ChatId       string `json:"chat_id"`
	Chat         Chat   `gorm:"foreignKey:ChatId;references:id"`
	SenderId     string `json:"sender_id"`
	Content      string `json:"content"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deleted"`
}

func (m *Message) BeforeCreate(tx *gorm.DB) (err error) {
	m.ID = uuid.NewV4().String()

	if m.ID == "" {
	  err = errors.New("can't save invalid data")
	}
	return
}