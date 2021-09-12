package controllers

import (
	"github.com/BrunoUemura/findit-backend-ms/tree/master/ms-auth-go/database"
	"github.com/BrunoUemura/findit-backend-ms/tree/master/ms-auth-go/models"
	"github.com/BrunoUemura/findit-backend-ms/tree/master/ms-auth-go/services"
	"github.com/gin-gonic/gin"
)

func RegisterUser(c *gin.Context) {
	db := database.GetDatabase()

	var user models.User

	err := c.ShouldBindJSON(&user)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot bind JSON: " + err.Error(),
		})
		return
	}

	user.Password, _ = services.HashPassword(user.Password)

	err = db.Create(&user).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot create user: " + err.Error(),
		})
		return
	}

	c.JSON(201, user)
}

func ConfirmRegistration(c *gin.Context) {
	id := c.Param("id")

	db := database.GetDatabase()

	var user models.User

	err := db.Where("id = ?", id).First(&user).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot find user: " + err.Error(),
		})
		return
	}

	err = db.Model(&user).Where("id = ?", id).Update("email_verified", true).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot confirm user: " + err.Error(),
		})
		return
	}

	c.JSON(201, user)
}

func LoginUser(c *gin.Context) {
	db := database.GetDatabase()

	var login models.Login

	err := c.ShouldBindJSON(&login)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "cannot bind JSON: " + err.Error(),
		})
		return
	}

	var user models.User

	dbError := db.Where("email = ?", login.Email).First(&user).Error
	if dbError != nil {
		c.JSON(400, gin.H{
			"error": "Email not registered",
		})
		return
	}

	if !services.CheckPasswordHash(login.Password, user.Password) {
		c.JSON(401, gin.H{
			"error": "invalid credentials",
		})
		return
	}

	if !user.EmailVerified {
		c.JSON(401, gin.H{
			"error": "Registration confirmation pending. Please verify your email",
		})
		return
	}

	token, err := services.NewJWTService().GenerateToken(user.ID)
	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"auth": true,
		"message": "Authentication Successful",
		"token": token,
	})
}

func LogoutUser(c *gin.Context) {
	var logout models.Logout

	err := c.ShouldBindJSON(&logout)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot bind JSON: " + err.Error(),
		})
		return
	}

	if !services.NewJWTService().InvalidateToken(logout.Token) {
		c.AbortWithStatus(401)
	}
}