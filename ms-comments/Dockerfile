FROM node:latest
LABEL maintainer="Bruno Uemura"

WORKDIR /usr/server

COPY ./ms-comments/package*.json ./
RUN npm install

COPY ./ms-comments/. .

COPY ./ms-comments/.sequelizerc .
COPY ./ms-comments/.env .

EXPOSE 4003

CMD node src/index.js