import * as nodemailer from "nodemailer";

export class EmailSender {
  public host: string = process.env.EMAIL_HOST;
  public port: number = 587;
  public user: string = process.env.EMAIL_USER;
  public password: string = process.env.EMAIL_PASS;

  sendMail(destination: string, subject: string, text: string, html: string) {
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: destination,
      subject: subject,
      text: text,
      html: html,
    };

    const transporter = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: false,
      auth: {
        user: this.user,
        pass: this.password,
      },
      tls: { rejectUnauthorized: false },
    });

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return error;
      } else {
        return "Email sent successfully";
      }
    });
  }
}
