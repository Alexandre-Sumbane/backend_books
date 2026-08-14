import { CategoryRepository } from "./category-repository";
import { Category } from "@/domain/model/category";
import { CategoryDto } from "@/domain/Dto/category";
import { Op } from "sequelize";


export class SequelizeCategoriesRepository implements CategoryRepository {
    async create(data: CategoryDto){
        const category = await Category.create(data);

        return category;
    }

    async findByName(name: string){
        const category = await Category.findOne({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        });

        return category;
    }

    async findById(categoryId: string){
        const category = await Category.findOne({
            where: {
                id: categoryId
            }
        });

        return category;
    }

    async findAll() {
        const categories = await Category.findAll();

        return categories;
    }

    async update(categoryId: string, categoryData: CategoryDto) {

        const categoryFound = await this.findById(categoryId);

        if (!categoryFound) {
            return null;
        }

        const category = await categoryFound.update(categoryData)

        return category;
    }

    async delete(categoryId: string){
        
        const categoryFound = await this.findById(categoryId);

        await categoryFound?.destroy();
    }






}