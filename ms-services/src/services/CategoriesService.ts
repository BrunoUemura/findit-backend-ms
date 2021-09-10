import { getRepository, Repository } from "typeorm";
import { Category } from "../models/Category";

export class CategoriesService {
  private categoriesRepository: Repository<Category>;

  constructor() {
    this.categoriesRepository = getRepository(Category);
  }

  async showAllCategories() {
    return await this.categoriesRepository.find();
  }
}
