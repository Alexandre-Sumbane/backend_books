import { OrderStatus } from "@/domain/model/order";
import { ClientRepository } from "./client-repository";

import sequelizeConnection from "@/infra/database/config/database";
import { Order } from "@/domain/model/order";
import { OrderResponse } from "@/domain/Dto/order";
import { Ebook } from "@/domain/model/book";

export class SequelizeClientRepository implements ClientRepository {
  async getClientOrders(userId: string) {
    const order = await Order.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Order,
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
    });

    if (!order || order.length === 0) {
      return null;
    }

    return order as OrderResponse[];
  }
  async changeOrderStatus(
    orderId: string,
    status: OrderStatus,
    userId: string,
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
            userId,
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
}
