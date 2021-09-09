import { EntityRepository, Repository } from "typeorm";
import { Portfolio } from "../models/Portfolio";

@EntityRepository(Portfolio)
export class PortfoliosRepository extends Repository<Portfolio> {}
