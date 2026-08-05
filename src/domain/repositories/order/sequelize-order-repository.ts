import { CreateOrder, OrderResponse } from "@/domain/Dto/order";
import { OrderRepository } from "./order-repository";

import sequelizeConnection from "@/infra/database/config/database";

import { Order } from "@/domain/model/order";
import th from "zod/v4/locales/th.js";

export class SequelizeOrderRepository implements OrderRepository {
  async create(orderDto: CreateOrder) {
    const transaction = await sequelizeConnection.transaction();

    try {
      const order = await Order.create(orderDto, {
        transaction,
      });

      await transaction.commit();

      return order;
    } catch (error) {
      console.log("Erro ao criar Order:", error);

      await transaction.rollback();

      throw error;
    }
  }

  async getUserOrder(userId: string, status: string) {
    const order = await Order.findOne({
      where: {
        userId,
        status,
      },
    });

    if (!order) {
      return null;
    }

    return order;
  }

  async removeOrder(orderId: string, userId: string) {
    const transaction = await sequelizeConnection.transaction();

    try {
      const order = await Order.findOne({
        where: {
          id: orderId,
          userId,
        },
      });

      if (!order) {
        return null;
      }

      await order.destroy({
        transaction,
      });

      await transaction.commit();
      
    } catch (error) {
      console.log("Erro ao remover Order:", error);

      throw error;

      await transaction.rollback();
    }
  }
}
