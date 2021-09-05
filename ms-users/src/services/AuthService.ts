import { getCustomRepository, Repository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import blacklist from "../middlewares/handleBlacklist";
import { EmailSender } from "../utils/emailSender";
import { AlreadyExists } from "../errors/AlreadyExists";
import { User } from "../models/User";
import { UsersRepository } from "../repositories/UsersRepository";
import dotenv from "dotenv";
dotenv.config();

interface IUsersAuth {
  name?: string;
  email: string;
  password?: string;
}

export class AuthService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  generateURL(route: string, id: string) {
    const baseURL = `${process.env.BASE_URL}:${process.env.PORT}`;
    return `${baseURL}${route}${id}`;
  }

  async registerUser({ name, email, password }: IUsersAuth) {
    const userAlreadyExists = await this.usersRepository.findOne({
      name,
      email,
    });

    if (userAlreadyExists) {
      throw new Error("User already registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    const url = this.generateURL("/api/auth/email-confirmation/", user.id);

    const destination = user.email;
    const subject = "Email Confirmation";
    const text = `Hi! Please confirm your registration by clicking the URL below: ${url}`;
    const html = `<h1>Hi!</h1> Please confirm your registration by clicking the URL below:<br></br> <a href="${url}">${url}</a>`;

    const emailSender = new EmailSender();
    const emailSent = emailSender.sendMail(destination, subject, text, html);

    return { message: "User registered successfully!", emailSent };
  }

  async confirmRegistration(id: string) {
    await this.usersRepository.update(id, { email_verified: true });
    return { message: `User email verified.` };
  }

  async loginUser({ email, password }: IUsersAuth) {
    const user = await this.usersRepository.findOne({
      email,
    });

    if (!user) {
      return { auth: false, message: "Email is not registered" };
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return { auth: false, message: "Authentication Failed" };
    }

    if (!user.email_verified) {
      return {
        auth: false,
        message: `A confirmation email was sent to ${email}. Verify email first.`,
      };
    }

    const payload = { id: user.id, email: user.email };
    const expiration = { expiresIn: "1h" };

    const token = jwt.sign(payload, process.env.JWT_SECRET, expiration);

    return { auth: true, message: "Authentication Successful", token };
  }

  async logoutUser(token: string) {
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
