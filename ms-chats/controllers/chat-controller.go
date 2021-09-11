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

	// newid, err := strconv.Atoi(id)
	// if err != nil {
	// 	c.JSON(400, gin.H{
	// 		"error": "ID has to be integer",
	// 	})
	// 	return
	// }

	db := database.GetDatabase()

	var chat models.Chat
	err := db.First(&chat, id).Error
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

	// newid, err := strconv.Atoi(id)
	// if err != nil {
	// 	c.JSON(400, gin.H{
	// 		"error": "ID has to be integer",
	// 	})
	// 	return
	// }

	db := database.GetDatabase()

	var chat models.Chat
	err := db.First(&chat.SenderId, id).Error
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

	// newid, err := strconv.Atoi(id)
	// if err != nil {
	// 	c.JSON(400, gin.H{
	// 		"error": "ID has to be integer",
	// 	})
	// 	return
	// }

	db := database.GetDatabase()

	var message models.Message
	err := db.Find(&message.ChatId, id).Error
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
	db := database.GetDatabase()

	var message models.Message

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