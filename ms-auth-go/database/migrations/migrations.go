package migrations

import (
	"github.com/BrunoUemura/findit-backend-ms/tree/master/ms-auth-go/models"
	"gorm.io/gorm"
)

func RunMigrations(db *gorm.DB) {
	db.AutoMigrate(models.User{})
}