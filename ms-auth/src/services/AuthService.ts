import { getCustomRepository, Repository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import blacklist from "../middlewares/handleBlacklist";
import { EmailSender } from "../utils/emailSender";
import { BadRequestError } from "../errors/BadRequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { Auth } from "../models/Auth";
import { AuthRepository } from "../repositories/AuthRepository";
import dotenv from "dotenv";
import axios from "axios";
import RabbitmqServer from "../rabbitmq-server";
dotenv.config();

interface IUsersAuth {
  type?: string;
  name?: string;
  email: string;
  password?: string;
}

export class AuthService {
  private authRepository: Repository<Auth>;

  constructor() {
    this.authRepository = getCustomRepository(AuthRepository);
  }

  generateURL(route: string, id: string) {
    const baseURL = `${process.env.BASE_URL}:${process.env.PORT}`;
    return `${baseURL}${route}${id}`;
  }

  async registerUser({ name, email, password }: IUsersAuth) {
    const userExists = await this.authRepository.findOne({
      email,
    });

    if (userExists) {
      throw new BadRequestError("Email already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUsersAuth = this.authRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.authRepository.save(user);

    user.type = "UserCreation";
    const server = new RabbitmqServer("amqp://admin:admin@localhost:5672");
    await server.start();
    await server.publishInQueue("user", JSON.stringify(user));
    await server.publishInExchange("amq.direct", "rota", JSON.stringify(user));

    // const url = this.generateURL("/api/auth/email-confirmation/", user.id);

    // const destination = user.email;
    // const subject = "Email Confirmation";
    // const text = `Hi! Please confirm your registration by clicking the URL below: ${url}`;
    // const html = `<h1>Hi!</h1> Please confirm your registration by clicking the URL below:<br></br> <a href="${url}">${url}</a>`;

    // const emailSender = new EmailSender();
    // const emailSent = emailSender.sendMail(destination, subject, text, html);

    // return { message: "User registered successfully!", emailSent };
    return { message: "User registered successfully!" };
  }

  async confirmRegistration(id: string) {
    const userExists = await this.authRepository.findOne({ id });
    if (!userExists) {
      throw new BadRequestError("User not registered");
    }
    await this.authRepository.update(id, { email_verified: true });
    return { message: `User email verified.` };
  }

  async loginUser({ email, password }: IUsersAuth) {
    const user = await this.authRepository.findOne({
      email,
    });

    if (!user) {
      throw new BadRequestError("Email not registered");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedError("Authentication Failed");
    }

    if (!user.email_verified) {
      throw new UnauthorizedError(
        `A confirmation email was sent to ${email}. Verify email first.`
      );
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
      throw new BadRequestError(error.message);
    }
  }
}
