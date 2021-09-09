import { getCustomRepository, Repository, getRepository } from "typeorm";
import { User } from "../models/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUsersCreate {
  type: string;
  id: string;
  name: string;
  email: string;
  password?: string;
}

export class RabbitmqService {
  private usersRepository: Repository<User>;
  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }
  async createUser(newUser: IUsersCreate) {
    const userToCreate = this.usersRepository.create({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
    await this.usersRepository.save(userToCreate);
    console.log(`CREATED new user id ${newUser.id}`);
    return { message: `CREATED new user id ${newUser.id}` };
  }
}
