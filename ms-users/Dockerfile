FROM node:latest
LABEL maintainer="Bruno Uemura"

WORKDIR /usr/server

COPY ./ms-users/package*.json ./
RUN npm install

COPY ./ms-users/. .

COPY ./ms-users/.sequelizerc .
COPY ./ms-users/.env .

EXPOSE 4001

CMD node src/index.js