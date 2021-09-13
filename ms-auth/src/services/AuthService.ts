import { Repository, getRepository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import blacklist from "../middlewares/handleBlacklist";
import { BadRequestError } from "../errors/BadRequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { Auth } from "../models/Auth";
import dotenv from "dotenv";
import RabbitmqServer from "../config/rabbitmq-server";
dotenv.config();

interface IUsersAuth {
  id?: string;
  type?: string;
  name?: string;
  email: string;
  password?: string;
}

export class AuthService {
  private authRepository: Repository<Auth>;

  constructor() {
    this.authRepository = getRepository(Auth);
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

    // Send new user and email request to RabbitMQ
    user.type = "UserCreation";
    const url = this.generateURL("/api/auth/email-confirmation/", user.id);
    const emailObject = {
      type: user.type,
      destination: user.email,
      subject: "Email Confirmation",
      text: `Hi! Please confirm your registration by clicking the URL below: ${url}`,
      html: `<h1>Hi!</h1> Please confirm your registration by clicking the URL below:<br></br> <a href="${url}">${url}</a>`,
    };

    const server = new RabbitmqServer(process.env.RABBITMQ_URL);
    await server.start();
    await server.publishInQueue("email", JSON.stringify(emailObject));
    await server.publishInExchange("amq.direct", "route", JSON.stringify(user));

    return { message: "User registered successfully" };
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

  async updateUser(userToUpdate: IUsersAuth) {
    await this.authRepository.update(userToUpdate.id, {
      name: userToUpdate.name,
    });
    console.log(`UPDATED user id ${userToUpdate.id}`);
    return { message: `UPDATED user id ${userToUpdate.id}` };
  }
}
