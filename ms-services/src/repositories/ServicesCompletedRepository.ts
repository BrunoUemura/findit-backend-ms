import { EntityRepository, Repository } from "typeorm";
import { ServiceCompleted } from "../models/ServiceCompleted";

@EntityRepository(ServiceCompleted)
export class ServicesCompletedRepository extends Repository<ServiceCompleted> {}
