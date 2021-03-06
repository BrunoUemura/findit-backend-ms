import { Repository, getRepository } from "typeorm";
import { User } from "../models/User";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";
import RabbitmqServer from "../config/rabbitmq-server";

interface IUsersCreate {
  id?: string;
  name: string;
  email: string;
  user_photo?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  occupation?: string;
  about_me?: string;
}

interface IUsersUpdate {
  type?: string;
  id?: string;
  name?: string;
  email?: string;
  password?: string;
}

interface IUsersDelete {
  type: string;
  id: string;
}

export class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getRepository(User);
  }

  async checkUserExists(id: string) {
    const userExists = await this.usersRepository.find({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundError("User not found");
    }

    return userExists;
  }

  async showAllUsers() {
    return await this.usersRepository.find();
  }

  async showOneUser(id: string) {
    return await this.usersRepository.findOne(id);
  }

  async showUsersCount() {
    const [list, count] = await this.usersRepository.findAndCount();
    return count;
  }

  async getProfileImage(id: string) {
    const userExists = await this.checkUserExists(id);

    const { user_photo } = userExists[0];

    return user_photo;
  }

  async createUser(userInfo: IUsersCreate) {
    const userExists = await this.usersRepository.findOne({
      where: { email: userInfo.email },
    });
    if (userExists) {
      throw new BadRequestError("User already registered");
    }

    const user = this.usersRepository.create({
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
    });
    await this.usersRepository.save(user);
    console.log(`CREATED user id ${user.id}`);
    return { message: `CREATED user id ${user.id}` };
  }

  async updateUser(id: string, userInfo: IUsersCreate) {
    const userExists = await this.usersRepository.findOne(id);

    if (!userExists) {
      throw new Error("User does not exist!");
    }

    await this.usersRepository.update(id, userInfo);

    const user: IUsersUpdate = {
      type: "UserUpdate",
      id,
      name: userInfo.name,
      email: userInfo.email,
    };
    const server = new RabbitmqServer(process.env.RABBITMQ_URL);
    await server.start();
    await server.publishInExchange("amq.direct", "route", JSON.stringify(user));

    return { message: `UPDATED user id ${id}` };
  }

  async uploadProfileImage(id: string, filename: string) {
    await this.checkUserExists(id);
    await this.usersRepository.update(id, { user_photo: filename });
    return { message: `UPDATED user id ${id} profile photo` };
  }

  async deleteUser(id: string) {
    const userToRemove = await this.usersRepository.findOne(id);
    if (!userToRemove) {
      throw new NotFoundError("User not found");
    }

    await this.usersRepository.softRemove(userToRemove);

    const user: IUsersDelete = {
      type: "UserDelete",
      id,
    };
    const server = new RabbitmqServer(process.env.RABBITMQ_URL);
    await server.start();
    await server.publishInExchange("amq.direct", "route", JSON.stringify(user));

    return { message: `DELETED user id ${id}` };
  }
}
