import express from "express";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

const microservices = {
  auth: {
    target: process.env.MS_AUTH,
    changeOrigin: true,
  },
  users: {
    target: process.env.MS_USERS,
    changeOrigin: true,
  },
  services: {
    target: process.env.MS_SERVICES,
    changeOrigin: true,
  },
  chats: {
    target: process.env.MS_CHATS,
    changeOrigin: true,
  },
};

app.use(morgan("dev"));
app.use("/api/auth", createProxyMiddleware(microservices.auth));
app.use("/api/users", createProxyMiddleware(microservices.users));
app.use("/api/services", createProxyMiddleware(microservices.services));
app.use("/api/categories", createProxyMiddleware(microservices.services));
app.use("/api/chats", createProxyMiddleware(microservices.chats));

export default app;
