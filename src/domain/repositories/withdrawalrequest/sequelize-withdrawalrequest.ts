import {
  WithdrawalRequest,
  WithdrawalRequestOutput,
  WithdrawalRequestStatus,
} from "@/domain/model/withdrawalrequest";

import sequelizeConnection from "@/infra/database/config/database";

import { WithdrawalRequestRepository } from "./withdrawalrequest-repository";

import { ChangeWithdrawalRequestDto } from "@/domain/Dto/with-drawal.dto";

export class SequelizeWithdrawalRepository implements WithdrawalRequestRepository {
  async create({
    sellerId,
    reference,
    amount,
    walletId,
  }: WithdrawalRequestOutput) {

    const withdrawalRequest = await WithdrawalRequest.create({
      sellerId,
      reference,
      amount,
      walletId,
      status: WithdrawalRequestStatus.pending,
    });

    return withdrawalRequest as WithdrawalRequestOutput;
    
  }
  async findById(id: string): Promise<WithdrawalRequestOutput> {
    const withdrawalRequest = await WithdrawalRequest.findByPk(id);

    return withdrawalRequest as WithdrawalRequestOutput;
  }
  async changeStatusWithdrawalRequest({
    withdrawalId,
    userId,
    status,
    reason,
  }: ChangeWithdrawalRequestDto) {
    const transaction = await sequelizeConnection.transaction();

    const withdrawalRequest = await WithdrawalRequest.findOne({
      where: {
        id: withdrawalId,
        ...(userId && { sellerId: userId }),
      },
    });

    try {
      let withdrawalUpdated;

      if (status === WithdrawalRequestStatus.cancelled) {
        withdrawalUpdated = await withdrawalRequest?.update({
          reason: reason,
          status: WithdrawalRequestStatus.cancelled,
          canceledAt: new Date(),
        });
      }

      if (status === WithdrawalRequestStatus.approved) {
        withdrawalUpdated = await withdrawalRequest?.update({
          status: WithdrawalRequestStatus.approved,
          approvedAt: new Date(),
        });
      }

      if (status === WithdrawalRequestStatus.blocked) {
        withdrawalUpdated = await withdrawalRequest?.update({
          reason: reason,
          status: WithdrawalRequestStatus.blocked,
        });
      }

      if (status === WithdrawalRequestStatus.rejected) {
        withdrawalUpdated = await withdrawalRequest?.update({
          reason: reason,
          status: WithdrawalRequestStatus.rejected,
          rejectedAt: new Date(),
        });
      }

      await transaction.commit();

      return withdrawalUpdated as WithdrawalRequestOutput;
    } catch (error: any) {
      console.log("Erro ao atualizar saque:", error);

      await transaction.rollback();

      throw error;
    }
  }

   public createReference(): string {
      return `WITHDR-${Date.now()}`;
  }
}
