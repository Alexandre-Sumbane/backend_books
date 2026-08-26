import { SequelizeWithdrawalRepository } from "@/domain/repositories/withdrawalrequest/sequelize-withdrawalrequest";
import { AdminUsecase } from "../admin/admin-usecase";


export function MakeAdminUsecase(){ 
    const withdrawalRepository = new SequelizeWithdrawalRepository();
    const adminUsecase = new AdminUsecase(withdrawalRepository);

    return adminUsecase;

}