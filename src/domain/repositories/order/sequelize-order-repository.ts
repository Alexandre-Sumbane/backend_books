import { CreateOrder, OrderResponse } from "@/domain/Dto/order";
import { OrderRepository } from "./order-repository";

import sequelizeConnection from "@/infra/database/config/database";

import { Order } from "@/domain/model/order";
import { OrderItem } from "@/domain/model/orderitem";
import { CartItem } from "@/domain/model/cartitem";

export class SequelizeOrderRepository implements OrderRepository {
  async create(orderDto: CreateOrder) {
    const transaction = await sequelizeConnection.transaction();

    try {
      const order = await Order.create(orderDto, {
        transaction,
      });

      const cartItems = await CartItem.findAll({
        where: {
          cartId: orderDto.cartId,
        },
        transaction,
      });

      for (const cartItem of cartItems) {
        await OrderItem.create(
          {
            orderId: order.id,
            bookId: cartItem.bookId,
            quantity: cartItem.quantity,
          },
          {
            transaction,
          },
        );
      }

      await transaction.commit();

      return order;
    } catch (error) {
      console.log("Erro ao criar Order:", error);

      await transaction.rollback();

      throw error;
    }
  }

  async getAllOrders() {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: "orderItems",
        },
      ],
    });

    if (!orders) {
      return null;
    }

    return orders;
  }

  async getUserOrders(userId: string) {
    const order = await Order.findAll({
      where: {
        userId
      },
      include: [
        {
          model: OrderItem,
          as: "orderItems",
        },
      ],
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
