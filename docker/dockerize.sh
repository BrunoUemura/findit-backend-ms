#!/bin/bash
green=`tput setaf 2`
reset=`tput sgr0`

echo -e "\n${green}[==== Building Docker Image ====]${reset}"
docker-compose build
docker-compose up -d

echo -e "\n${green}[==== Checking database relations ====]${reset}"
status_code=$(curl --write-out %{http_code} --silent --output /dev/null http://localhost:8080/api/users)

if [[ $status_code -ne 200 ]] ; then
  echo -e "${green}[======= Executing  Migrations =======]${reset}"
  sleep 30
  docker exec node-1 npm run migrations
  docker exec node-1 npm run seeds
else
  echo -e "${green}[==== Migrations already executed ====]${reset}"
  exit 0
fi