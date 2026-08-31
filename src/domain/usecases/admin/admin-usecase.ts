import { ChangeWithdrawalRequestDto } from "@/domain/Dto/with-drawal.dto";
import { OrderStatus } from "@/domain/model/order";
import { TransactionStatus, TransactionType } from "@/domain/model/transaction";
import { AdminRepository } from "@/domain/repositories/admin/admin-repository";
import { OrderRepository } from "@/domain/repositories/order/order-repository";
import { TransactionRepository } from "@/domain/repositories/transaction/transaction-repository";
import { WithdrawalRequestRepository } from "@/domain/repositories/withdrawalrequest/withdrawalrequest-repository";
import { HttpExceptionFactory } from "helpers/HttpExceptionFactory";


export class AdminUsecase {

    constructor(
      private withdrawalRepository: WithdrawalRequestRepository,
      private adminRepository: AdminRepository,
      private ordersRepository: OrderRepository,
      private transactionRepository: TransactionRepository
    ){} 

    async getAllOrders(){
        const orders = await this.ordersRepository.getAllOrders();

        if (!orders || orders.length === 0) {
          throw HttpExceptionFactory.notFound("Nenhuma pedido foi encontrado!");
        }

        return orders;
    }

    async changestatusWithdrwalRequest({withdrawalId, status, reason}: ChangeWithdrawalRequestDto){

        const validStatus = ["approved", "blocked", "cancelled", "rejected"];

        if (!validStatus.includes(status)) {
          throw HttpExceptionFactory.badRequest("Status invalido!");
        }

        const withdrawal = await this.withdrawalRepository.findById(withdrawalId);

        if (!withdrawal || withdrawal == null) {
          throw HttpExceptionFactory.notFound("Solicitacao nao encontrada!");
        }

        const result = await this.withdrawalRepository.changeStatusWithdrawalRequest({withdrawalId, status, reason});

        if(result.status === "approved"){
          await this.transactionRepository.create({
            amount: -Number(withdrawal.amount),
            sellerId: withdrawal.sellerId,
            type: TransactionType.withdrawal,
            status: TransactionStatus.confirmed
          })
        }

        return result;
    }

    async changeOrderStatus(orderId: string, status: OrderStatus){

      const validStatus = ["shipped", "delivered", "completed", "cancelled"];

      if (!validStatus.includes(status)) {
        throw HttpExceptionFactory.badRequest("Status invalido!");
      }

      const order = await this.ordersRepository.getOrderById(orderId);

      if (!order) {
        throw HttpExceptionFactory.notFound("Order nao encontrada!");
      }

      const result = await this.adminRepository.changeOrderStatus(orderId, status);

      return result
    }

    async getClientConfirmations() {

      const confirmations = await this.adminRepository.getClientConfirmations();

      return confirmations
    }
}