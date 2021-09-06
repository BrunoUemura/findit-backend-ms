import { Router } from "express";
import { sendEmail } from "../controllers/EmailSenderController.js";

const routes = Router();

routes.get("/api/v1/", (_, res) => {
  res.send("Email sender API");
});

routes.post("/api/v1/send-email", sendEmail);

export default routes;
