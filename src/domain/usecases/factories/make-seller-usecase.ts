import { SequelizeEarningRepository } from "@/domain/repositories/earning/sequelize-earning";
import { SellerUsecases } from "../seller/seller-usecase";
import { SequelizeWithdrawalRepository } from "@/domain/repositories/withdrawalrequest/sequelize-withdrawalrequest";
import { SequelizeEbooksRepository } from "@/domain/repositories/ebook/sequelize-ebook-repository";

export function MakeSellerUsecase(){ 
    const earningRepository = new SequelizeEarningRepository();
    const withdrawalRepository = new SequelizeWithdrawalRepository();
    const ebookRepository = new SequelizeEbooksRepository();
    const sellerUsecase = new SellerUsecases(
        earningRepository,
        withdrawalRepository,
        ebookRepository
    );

    return sellerUsecase;
}    