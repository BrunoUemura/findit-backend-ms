import { EntityRepository, Repository } from "typeorm";
import { UserFeedback } from "../models/UserFeedback";

@EntityRepository(UserFeedback)
export class UsersFeedbacksRepository extends Repository<UserFeedback> {}
