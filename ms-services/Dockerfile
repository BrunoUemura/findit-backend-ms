FROM node:latest
LABEL maintainer="Bruno Uemura"

WORKDIR /usr/server

COPY ./ms-services/package*.json ./
RUN npm install

COPY ./ms-services/. .

COPY ./ms-services/.sequelizerc .
COPY ./ms-services/.env .

EXPOSE 4002

CMD node src/index.js