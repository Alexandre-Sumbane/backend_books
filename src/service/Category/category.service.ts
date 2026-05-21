import { HttpExceptionFactory } from "../../../helpers/HttpExceptionFactory";
import models from "../../models";
import { CategoryAttributes } from "../../types/category";

export class CategoryService {
  constructor(private model: typeof models) {}

  async create(category: CategoryAttributes): Promise<CategoryAttributes> {
    const newCategory = await models.Category.create(category);

    return newCategory;
  }

  async findAll(): Promise<CategoryAttributes[]> {
    const categories = await this.model.Category.findAll({
      attributes: ["id", "name", "description", "imageUrl"],
      order: [["createdAt", "ASC"]],
    });

    if (categories.length === 0) {
      throw HttpExceptionFactory.notFound("No categories found");
    }

    return categories;
  }

  async findById(id: string): Promise<CategoryAttributes> {
    const category = await models.Category.findByPk(id, {
      attributes: ["id", "name", "description", "imageUrl"],
      order: [["createdAt", "ASC"]],
      include: [{ model: this.model.Book, as: "books" }],
    });

    if (!category) {
      throw HttpExceptionFactory.notFound("Category not found");
    }

    return category;
  }

  async update(id: string, category: CategoryAttributes): Promise<void> {
    const categoryFound = await models.Category.findByPk(id);

    if (!categoryFound) {
      throw HttpExceptionFactory.notFound("Category not found");
    }

    await categoryFound.update(category);
  
  }

  async delete(id: string): Promise<void> {
    const categoryFound = await models.Category.findByPk(id);

    if (!categoryFound) {
      throw HttpExceptionFactory.notFound("Category not found");
    }

    await categoryFound.destroy();
  }
}
