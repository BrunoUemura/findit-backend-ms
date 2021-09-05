import { EntityRepository, Repository } from "typeorm";
import { Service } from "../models/Service";

@EntityRepository(Service)
export class ServicesRepository extends Repository<Service> {}
