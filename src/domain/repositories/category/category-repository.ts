import { CategoryDto, CategoryResponse } from "../../Dto/category";

export interface CategoryRepository {
  create(categoryData: CategoryDto): Promise<CategoryResponse>;
  findByName(name: string): Promise<CategoryResponse | null>;
  findById(categoryId: string): Promise<CategoryResponse | null>;
  findAll(): Promise<CategoryResponse[]>;
  update(categoryId: string, categoryData: CategoryDto): Promise<CategoryResponse | null>;
  delete(categoryId: string): Promise<void>;
}