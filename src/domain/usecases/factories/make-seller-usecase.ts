import { SequelizeEarningRepository } from "@/domain/repositories/earning/sequelize-earning";
import { SellerUsecases } from "../seller/seller-usecase";
import { SequelizeWithdrawalRepository } from "@/domain/repositories/withdrawalrequest/sequelize-withdrawalrequest";

export function MakeSellerUsecase(){ 
    const earningRepository = new SequelizeEarningRepository();
    const withdrawalRepository = new SequelizeWithdrawalRepository();
    const sellerUsecase = new SellerUsecases(earningRepository, withdrawalRepository);

    return sellerUsecase;
}    