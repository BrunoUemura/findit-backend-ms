const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailSender {
  static async sendEmail(destination, subject, text, html) {
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
        return result;
      })
      .catch((error) => {
        return error;
      });
  }
}

module.exports = EmailSender;

// const nodemailer = require("nodemailer");

// const emailConfigurationProd = {
//   host: process.env.EMAIL_HOST,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   secure: true,
// };

// const emailConfigurationDev = (testAccount) => ({
//   host: "smtp.ethereal.email",
//   auth: testAccount,
// });

// async function createEmailConfig() {
//   if (process.env.NODE_ENV === "production") {
//     return emailConfigurationProd;
//   }
//   const testAccount = await nodemailer.createTestAccount();
//   return emailConfigurationDev(testAccount);
// }

// class Email {
//   async sendEmail() {
//     const emailConfiguration = await createEmailConfig();
//     const transporter = nodemailer.createTransport(emailConfiguration);

//     const info = await transporter.sendMail(this);

//     if (process.env.NODE_ENV !== "production") {
//       console.log("URL: " + nodemailer.getTestMessageUrl(info));
//     }
//   }
// }

// class EmailConfirmation extends Email {
//   constructor(email, address) {
//     super();
//     this.from = '"FindIt" <noreply@findit.com>';
//     this.to = email;
//     this.subject = "Email Confirmation";
//     this.text = `Hi! Please confirm your registration by clicking the URL below: ${address}`;
//     this.html = `<h1>Hi!</h1> Please confirm your registration by clicking the URL below:<br></br> <a href="${address}">${address}</a>`;
//   }
// }

// module.exports = { EmailConfirmation };
