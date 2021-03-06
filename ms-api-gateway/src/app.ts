import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import { microservices } from "./config/microservices-addr";

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", createProxyMiddleware(microservices.auth));
app.use("/api/users", createProxyMiddleware(microservices.users));
app.use("/api/services", createProxyMiddleware(microservices.services));
app.use("/api/categories", createProxyMiddleware(microservices.services));
app.use("/api/comments", createProxyMiddleware(microservices.services));
app.use("/api/chats", createProxyMiddleware(microservices.chats));

export default app;
