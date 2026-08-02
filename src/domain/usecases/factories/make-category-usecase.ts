import { SequelizeCategoriesRepository } from "@/domain/repositories/category/sequelize-category-repository";
import { CategoryUsecases } from "@/domain/usecases/category/category-usecases";


export function MakeCategoryUsecase(){ 
    const categoryRepository = new SequelizeCategoriesRepository();
    const categoryUsecase = new CategoryUsecases(categoryRepository);
    
    return categoryUsecase;
}