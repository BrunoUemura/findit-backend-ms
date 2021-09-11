package main

import (
	"github.com/BrunoUemura/findit-backend-ms/tree/master/ms-chats/database"
	"github.com/BrunoUemura/findit-backend-ms/tree/master/ms-chats/server"
)

func main() {
	database.StartDB()
	server := server.NewServer()
	server.Run()
}