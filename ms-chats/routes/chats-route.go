package routes

import (
	"github.com/BrunoUemura/findit-backend-ms/tree/master/ms-chats/controllers"
	"github.com/BrunoUemura/findit-backend-ms/tree/master/ms-chats/server/middlewares"
	"github.com/gin-gonic/gin"
)

func ChatRoutes(router *gin.Engine) {
	chats := router.Group("api", middlewares.Auth())
	{
		chats.GET("/chats", controllers.ShowChats)
		chats.GET("/chatsById/:id", controllers.ShowChatById)
		chats.GET("/chatsByUser/:id", controllers.ShowChatsByUserId)
		chats.GET("/chat/messages/:id", controllers.ShowMessagesFromChat)
		chats.POST("/chat/create-chat", controllers.CreateChatRoom)
		chats.POST("/chat/send-message/:id", controllers.CreateMessage)
	}
}