import {
  AdminRepository,
  ChangeWithdrawalRequestDto,
} from "./admin-repository";

import sequelizeConnection from "@/infra/database/config/database";
import { Order, OrderStatus } from "@/domain/model/order";
import { OrderResponse } from "@/domain/Dto/order";
import { ClientConfirmation } from "@/domain/model/client-confirmation";
import { Ebook } from "@/domain/model/book";
import { OrderItem } from "@/domain/model/orderitem";
import {
  WithdrawalRequest,
  WithdrawalRequestOutput,
} from "@/domain/model/withdrawalrequest";

export class SequelizeAdminRepository implements AdminRepository {
  async changeOrderStatus(
    orderId: string,
    status: OrderStatus,
    userId?: string,
  ) {
    const transaction = await sequelizeConnection.transaction();

    try {
      const order = await Order.findByPk(orderId);

      const updated = await order?.update(
        {
          status: status,
        },
        {
          where: {
            id: orderId,
            ...(userId && { userId }),
          },
          transaction,
        },
      );

      await transaction.commit();

      return updated as OrderResponse;
    } catch (error) {
      console.log("Erro ao atualizar status do pedido:", error);

      await transaction.rollback();

      throw error;
    }
  }

  // async changestatusWithdrwalRequest({
  //   withdrawalId,
  //   status,
  //   reason,
  // }: ChangeWithdrawalRequestDto) {
  //   const transaction = await sequelizeConnection.transaction();

  //   try {
  //     const withdrawalRequest = await WithdrawalRequest.findByPk(withdrawalId);

  //     if (!withdrawalRequest) {
  //       return null;
  //     }

  //     const updated = await withdrawalRequest?.update(
  //       {
  //         status: status,
  //         reason: reason,
  //       },
  //       {
  //         where: {
  //           id: withdrawalId,
  //         },
  //         transaction,
  //       },
  //     );

  //     await transaction.commit();

  //     return updated as WithdrawalRequestOutput;
  //   } catch (error) {
  //     console.log("Erro ao atualizar status do pedido:", error);

  //     await transaction.rollback();

  //     throw error;
  //   }
  // }

  async changestatusWithdrwalRequest({
  withdrawalId,
  status,
  reason,
}: ChangeWithdrawalRequestDto) {
  const transaction = await sequelizeConnection.transaction();

  try {
    const withdrawalRequest = await WithdrawalRequest.findByPk(
      withdrawalId,
      { transaction }
    );

    if (!withdrawalRequest) {
      await transaction.rollback();
      return null;
    }

    const updated = await withdrawalRequest.update(
      {
        status,
        reason,
      },
      {
        transaction,
      },
    );

    await transaction.commit();

    return updated as WithdrawalRequestOutput;
  } catch (error) {
    console.log("Erro ao atualizar status do pedido:", error);

    await transaction.rollback();

    throw error;
  }
}

  async getClientConfirmations() {
    const confirmations = await ClientConfirmation.findAll({
      include: [
        {
          model: Order,
          as: "order",
          attributes: ["id", "totalAmount"],
          include: [
            {
              model: OrderItem,
              as: "orderItems",
              include: [
                {
                  model: Ebook,
                  as: "book",
                  attributes: [
                    "id",
                    "title",
                    "code",
                    "price",
                    "language",
                    "author",
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!confirmations || confirmations.length === 0) {
      return null;
    }

    return confirmations;
  }
}
