FROM node:latest
LABEL maintainer="Bruno Uemura"

WORKDIR /usr/server

COPY ./ms-chats/package*.json ./
RUN npm install

COPY ./ms-chats/. .

COPY ./ms-chats/.sequelizerc .
COPY ./ms-chats/.env .

EXPOSE 4004

CMD node src/index.js