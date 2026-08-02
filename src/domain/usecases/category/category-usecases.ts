import { HttpExceptionFactory } from "../../../../helpers/HttpExceptionFactory";
import { CategoryDto, CategoryResponse } from "@/domain/Dto/category";
import { CategoryRepository } from "@/domain/repositories/category/category-repository";


export class CategoryUsecases {

  constructor(private categoryRepository: CategoryRepository) {}
  async create(category: CategoryDto): Promise<CategoryResponse> {

    const bookFound = await this.categoryRepository.findByName(category.name);


    if (bookFound) {
      throw HttpExceptionFactory.conflict("A categoria já existe, tente outro nome!");
    }
  
    const newBook = await this.categoryRepository.create(category);

    return newBook;
  }

  async findAll(): Promise<CategoryResponse[]> {

    const books = await this.categoryRepository.findAll();

    if (books.length === 0) {
      throw HttpExceptionFactory.notFound("Nenhuma categoria foi encontrada!");
    }

    return books;
  }


  async findByName(name: string): Promise<CategoryResponse> {
    const category = await this.categoryRepository.findByName(name);

    if (!category) {
      throw HttpExceptionFactory.notFound("Categoria não encontrada!");
    }

    return category;
  }

  async findById(id: string): Promise<CategoryResponse> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw HttpExceptionFactory.notFound("Categoria não encontrada!");
    }

    return category;
  }

  async update(id: string, data: CategoryDto): Promise<CategoryResponse | null> {
    const categoryFound = await this.categoryRepository.findById(id);

    if (!categoryFound) {
      throw HttpExceptionFactory.notFound("Categoria não encontrada");
    }

    const category = await this.categoryRepository.update(id, data);

   return category;
  }

  async delete(id: string): Promise<void> {
    const categoryFound = await this.categoryRepository.findById(id);

    if (!categoryFound) {
      throw HttpExceptionFactory.notFound("Categoria nao encontrada!");
    }

    await this.categoryRepository.delete(id);
  }
}
