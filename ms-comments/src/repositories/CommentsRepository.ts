import { EntityRepository, Repository } from "typeorm";
import { Comment } from "../models/Comment";

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {}
