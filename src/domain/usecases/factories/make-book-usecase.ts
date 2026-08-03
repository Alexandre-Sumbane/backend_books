import { SequelizeEbooksRepository } from "@/domain/repositories/ebook/sequelize-ebook-repository";
import { EBookUsecases } from "@/domain/usecases/ebook/ebook-usecases";

export function MakeEBookUsecase(){ 
    const ebookRepository = new SequelizeEbooksRepository();
    const ebookUsecase = new EBookUsecases(ebookRepository);

    return ebookUsecase;
}