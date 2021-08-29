const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const database = require("../database/models");
const blacklist = require("../middlewares/handleBlacklist");
const EmailSender = require("../../../utils/emailSender");
const AlreadyExists = require("../errors/AlreadyExists");
require("dotenv").config();

function generateURL(route, id) {
  const baseURL = `${process.env.BASE_URL}:${process.env.PORT}`;
  return `${baseURL}${route}${id}`;
}

class AuthService {
  async registerUser({ name, email, password }) {
    const userAlreadyExists = await database.Users.findOne({
      where: { name, email },
    });

    if (userAlreadyExists) {
      throw new AlreadyExists("User already registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await database.Users.create({
      name,
      email,
      password: hashedPassword,
    });

    const url = generateURL("/api/auth/email-confirmation/", user.id);

    const destination = user.email;
    const subject = "Email Confirmation";
    const text = `Hi! Please confirm your registration by clicking the URL below: ${url}`;
    const html = `<h1>Hi!</h1> Please confirm your registration by clicking the URL below:<br></br> <a href="${url}">${url}</a>`;

    const emailSent = await EmailSender.sendEmail(
      destination,
      subject,
      text,
      html
    );

    return { message: "User registered successfully!", emailSent };
  }

  async confirmRegistration(id) {
    await database.Users.update({ email_verified: true }, { where: { id } });
    return { message: `User email verified.` };
  }

  async loginUser({ email, password }) {
    const user = await database.Users.findOne({ where: { email } });

    if (!user) {
      return { auth: false, message: `Email ${email} is not registered` };
    }

    const payload = { id: user.id, email: user.email };
    const expiration = { expiresIn: "1h" };

    if (!user.email_verified) {
      return {
        auth: false,
        message: `A confirmation email was sent to ${email}. Verify email first.`,
      };
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return { auth: false, message: "Authentication Failed" };
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, expiration);

    return { auth: true, message: "Authentication Successful", token };
  }

  async logoutUser(token) {
    try {
      const tokenInBlackList = await blacklist.tokenExists(token);

      if (tokenInBlackList) {
        throw new jwt.JsonWebTokenError("Already Logged out.");
      }

      await blacklist.add(token);

      return { auth: true, message: "Signed out successfully" };
    } catch (error) {
      return { auth: false, message: error.message };
    }
  }
}

module.exports = AuthService;
