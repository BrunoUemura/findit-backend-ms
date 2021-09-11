package routes

import (
	"github.com/gin-gonic/gin"
)

func ConfigRoutes(router *gin.Engine) *gin.Engine {
	ChatRoutes(router)
	return router
}