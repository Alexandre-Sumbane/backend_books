
import { OrderStatus } from "@/domain/model/order";
import { ClientRepository } from "./client-repository";

import sequelizeConnection from "@/infra/database/config/database";
import { Order } from "@/domain/model/order";
import { OrderResponse } from "@/domain/Dto/order";

export class SequelizeClientRepository implements ClientRepository {
     async changeOrderStatus(orderId: string, status: OrderStatus, userId: string) {
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