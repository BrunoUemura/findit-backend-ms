package controllers

import (
	"github.com/BrunoUemura/findit-backend-ms/tree/master/ms-chats/database"
	"github.com/BrunoUemura/findit-backend-ms/tree/master/ms-chats/models"
	"github.com/gin-gonic/gin"
)

func ShowChats(c *gin.Context) {
	db := database.GetDatabase()

	var chats []models.Chat

	err := db.Find(&chats).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot list chats: " + err.Error(),
		})
		return
	}

	c.JSON(200, chats)
}

func ShowChatById(c *gin.Context) {
	id := c.Param("id")

	db := database.GetDatabase()

	var chat models.Chat
	err := db.First(&chat, "id = ?", id).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot find chat: " + err.Error(),
		})
		return
	}

	c.JSON(200, chat)
}

func ShowChatsByUserId(c *gin.Context) {
	id := c.Param("id")

	db := database.GetDatabase()

	var chat []models.Chat
	err := db.Where("sender_id = ?", id).Or("receiver_id = ?", id).Find(&chat).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot find chat: " + err.Error(),
		})
		return
	}

	c.JSON(200, chat)
}

func ShowMessagesFromChat(c *gin.Context) {
	id := c.Param("id")

	db := database.GetDatabase()

	var message []models.Message
	err := db.Find(&message, "chat_id = ?", id).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot find messages: " + err.Error(),
		})
		return
	}

	c.JSON(200, message)
}

func CreateChatRoom(c *gin.Context) {
	db := database.GetDatabase()

	var chat models.Chat

	err := c.ShouldBindJSON(&chat)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot bind JSON: " + err.Error(),
		})
		return
	}

	err = db.Create(&chat).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot create chat: " + err.Error(),
		})
		return
	}

	c.JSON(200, chat)
}

func CreateMessage(c *gin.Context) {
	id := c.Param("id")
	db := database.GetDatabase()

	var message models.Message
	message.ChatId = id

	err := c.ShouldBindJSON(&message)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot bind JSON: " + err.Error(),
		})
		return
	}

	err = db.Create(&message).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot create message: " + err.Error(),
		})
		return
	}

	c.JSON(200, message)
}