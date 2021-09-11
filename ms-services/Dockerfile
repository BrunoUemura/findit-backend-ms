FROM node:latest
LABEL maintainer="Bruno Uemura"
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4002
CMD ["npm", "start"]