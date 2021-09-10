import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendEmail(message) {
  const { destination, subject, text, html } = message;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter
    .sendMail({
      from: process.env.EMAIL_USER,
      to: destination,
      replyTo: destination,
      subject,
      text,
      html,
    })
    .then((result) => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.log("Email sending failed");
    });
}
