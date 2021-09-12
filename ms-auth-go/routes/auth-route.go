package routes

import (
	"github.com/BrunoUemura/findit-backend-ms/tree/master/ms-auth-go/controllers"
	"github.com/gin-gonic/gin"
)

func AuthRoutes(router *gin.Engine) {
	auth := router.Group("api/auth")
	{
		auth.POST("/register", controllers.RegisterUser)
		auth.GET("/email-confirmation/:id", controllers.ConfirmRegistration)
		auth.POST("/login", controllers.LoginUser)
		auth.POST("/logout", controllers.LogoutUser)
	}
}