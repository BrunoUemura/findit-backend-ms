package models

import (
	"errors"
	"time"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

type Chat struct {
	ID         string `json:"id" gorm:"column:id;" sql:"type:uuid;primary_key;default:uuid_generate_v4()"`
	SenderId     string `json:"sender_id"`
	ReceiverId   string `json:"receiver_id"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deleted"`
}

func (c *Chat) BeforeCreate(tx *gorm.DB) (err error) {
	c.ID = uuid.NewV4().String()

	if c.ID == "" {
	  err = errors.New("can't save invalid data")
	}
	return
}