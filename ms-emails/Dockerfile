FROM node:latest

WORKDIR /usr/server

COPY package*.json ./
RUN npm install

COPY . .
COPY .env .

EXPOSE 4001

CMD node src/index.js