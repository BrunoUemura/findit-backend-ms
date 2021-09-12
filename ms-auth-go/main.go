package main

import (
	"log"

	"github.com/BrunoUemura/findit-backend-ms/tree/master/ms-auth-go/database"
	"github.com/BrunoUemura/findit-backend-ms/tree/master/ms-auth-go/server"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	database.StartDB()
	server := server.NewServer()
	server.Run()
}