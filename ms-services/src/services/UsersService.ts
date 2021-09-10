import { Repository, getRepository } from "typeorm";
import { User } from "../models/User";
// import { ServiceCompleted } from "../models/ServiceCompleted";
// import { ServicesCompletedRepository } from "../repositories/ServicesCompletedRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";
import RabbitmqServer from "../config/rabbitmq-server";

interface IUsersUpdate {
  type?: string;
  id?: string;
  name?: string;
  email?: string;
  password?: string;
}

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

export class UsersService {
  private usersRepository: Repository<User>;
  // private servicesCompletedRepository: Repository<ServiceCompleted>;

  constructor() {
    this.usersRepository = getRepository(User);
    // this.servicesCompletedRepository = getCustomRepository(
    //   ServicesCompletedRepository
    // );
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

  async updateUser(userInfo: IUsersCreate) {
    const userExists = await this.usersRepository.findOne(userInfo.id);
    if (!userExists) {
      throw new Error("User does not exist!");
    }
    await this.usersRepository.update(userInfo.id, userInfo);
    console.log(`UPDATED user id ${userInfo.id}`);
    return { message: `UPDATED user id ${userInfo.id}` };
  }

  async uploadProfileImage(id: string, filename: string) {
    await this.checkUserExists(id);
    await this.usersRepository.update(id, { user_photo: filename });
    return { message: `UPDATED user id ${id} profile photo` };
  }
}
