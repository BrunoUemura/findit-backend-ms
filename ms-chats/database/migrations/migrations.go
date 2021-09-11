package migrations

import (
	"github.com/BrunoUemura/findit-backend-ms/tree/master/ms-chats/models"
	"gorm.io/gorm"
)

func RunMigrations(db *gorm.DB) {
	db.AutoMigrate(models.Chat{})
	db.AutoMigrate(models.Message{})
	db.AutoMigrate(models.User{})
}