FROM node:latest

WORKDIR /usr/server

COPY ./ms-emails/package*.json ./
RUN npm install

COPY ./ms-emails/. .
COPY ./ms-emails/.env .

EXPOSE 4005

CMD node src/index.js