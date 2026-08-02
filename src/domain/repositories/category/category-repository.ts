import { CategoryDto, CategoryResponse } from "../../Dto/category";

export interface CategoryRepository {
  create(categoryData: CategoryDto): Promise<CategoryResponse>;
  findById(categoryId: string): Promise<CategoryResponse | null>;
  findAll(): Promise<CategoryResponse[]>;
  update(categoryId: string, categoryData: CategoryDto): Promise<CategoryResponse | null>;
  delete(categoryId: string): Promise<void>;
}