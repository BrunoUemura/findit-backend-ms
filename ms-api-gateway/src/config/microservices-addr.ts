import * as dotenv from "dotenv";
dotenv.config();

export const microservices = {
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
