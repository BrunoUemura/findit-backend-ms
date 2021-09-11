package models

import (
	"errors"
	"time"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

type User struct {
	ID           string `json:"id" gorm:"column:id;" sql:"type:uuid;primary_key;default:uuid_generate_v4()"`
	Name     string `json:"name"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deleted"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.NewV4().String()

	if u.ID == "" {
	  err = errors.New("can't save invalid data")
	}
	return
}