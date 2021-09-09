import { EntityRepository, Repository } from "typeorm";
import { Auth } from "../models/Auth";

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {}
