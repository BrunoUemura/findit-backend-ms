import { Repository, getRepository } from "typeorm";
import { Auth } from "../models/Auth";
import { NotFoundError } from "../errors/NotFoundError";

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
  private usersRepository: Repository<Auth>;

  constructor() {
    this.usersRepository = getRepository(Auth);
  }

  async updateUser(userToUpdate: IUsersUpdate) {
    await this.usersRepository.update(userToUpdate.id, {
      name: userToUpdate.name,
    });
    console.log(`UPDATED user id ${userToUpdate.id}`);
    return { message: `UPDATED user id ${userToUpdate.id}` };
  }

  async deleteUser(userToDelete: IUsersDelete) {
    const userToRemove = await this.usersRepository.findOne(userToDelete.id);
    if (!userToRemove) {
      throw new NotFoundError("User not found");
    }
    await this.usersRepository.softRemove(userToRemove);
    console.log(`DELETED user id ${userToRemove.id}`);
    return { message: `DELETED user id ${userToRemove.id}` };
  }
}
