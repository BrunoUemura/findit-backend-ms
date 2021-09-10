#!/bin/bash
green=`tput setaf 2`
reset=`tput sgr0`

echo -e "\n${green}[==== Running Docker Compose ====]${reset}"
docker-compose up -d
