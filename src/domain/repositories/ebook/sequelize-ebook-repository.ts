import { EbookDto } from "@/domain/Dto/Book";
import { EbookRepository } from "./ebook-repository";

import { EBook } from "@/domain/model/book";


export class SequelizeEbooksRepository implements EbookRepository {
    async create(data: EbookDto){
        const ebook = await EBook.create(data);

        return ebook;
    }

    async findById(ebookId: string){
        const ebook = await EBook.findOne({
            where: {
                id: ebookId
            }
        });

        return ebook;
    }

    async findByCategoryId(categoryId: string){
        const ebooks = await EBook.findAll({
            where: {
                categoryId
            }
        });

        return ebooks;
    }

    async findByCode(code: string) {
        const ebook = await EBook.findOne({
            where: {
                code
            }
        });

        return ebook;
    }

    async findAll() {
        const ebooks = await EBook.findAll();

        return ebooks;
    }

    async update(ebookId: string, ebookData: EbookDto) {

        const ebookFound = await this.findById(ebookId);

        if (!ebookFound) {
            return null;
        }

        const ebook = await ebookFound.update(ebookData)

        return ebook;
    }

    async delete(ebookId: string){
        
        const ebookFound = await this.findById(ebookId);

        await ebookFound?.destroy()
    }






}