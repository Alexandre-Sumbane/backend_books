import { AdminUsecase } from "../admin/admin-usecase";
import { SequelizeOrderRepository } from "@/domain/repositories/order/sequelize-order-repository";
import { SequelizeWithdrawalRepository } from "@/domain/repositories/withdrawalrequest/sequelize-withdrawalrequest";
import { SequelizeAdminRepository } from "@/domain/repositories/admin/sequelize-admin-repository";

export function MakeAdminUsecase() {
  const orderRepository = new SequelizeOrderRepository();
  const withdrawalRepository = new SequelizeWithdrawalRepository();
  const adminRepository = new SequelizeAdminRepository();

  const adminUsecase = new AdminUsecase(
    withdrawalRepository,
    adminRepository,
    orderRepository,
  );

  return adminUsecase;
}
