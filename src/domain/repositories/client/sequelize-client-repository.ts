import { OrderStatus } from "@/domain/model/order";
import { ClientRepository } from "./client-repository";

import sequelizeConnection from "@/infra/database/config/database";
import { Order } from "@/domain/model/order";
import { OrderResponse } from "@/domain/Dto/order";
import { Ebook } from "@/domain/model/book";
import { UserEbook } from "@/domain/model/userBook";
import { Delivery } from "@/domain/model/delivery";
import {
  ClientConfirmation,
  ClientConfirmationStatus,
} from "@/domain/model/client-confirmation";
import { Op } from "sequelize";

export interface ConfirmationItemsProps {
  orderId: string;
  bookId: string;
  quantity?: number;
  status: ClientConfirmationStatus;
  userId: string;
  note?: string;
}

export class SequelizeClientRepository implements ClientRepository {
  async confirmItems({
    orderId,
    bookId,
    quantity,
    status,
    userId,
    note,
  }: ConfirmationItemsProps) {

    const order = await Order.findOne({
      where: {
        id: orderId,
        userId,
        status: {
          [Op.notIn]: [OrderStatus.pending, OrderStatus.cancelled],
        },
      },
    });

    if (!order) {
      return null;
    }

    const item = await UserEbook.findOne({
      where: {
        ebookId: bookId,
        userId,

      },
    });

    const confirmation = await ClientConfirmation.create({
      bookId,
      orderId,
      quantity,
      status,
      note,
      userId,
      confirmedAt: new Date(),
    });

    if(confirmation.status === ClientConfirmationStatus.received) {
      confirmation.receivedAt = new Date();
    }

    if(confirmation.status === ClientConfirmationStatus.cancelled) {
      confirmation.cancelledAt = new Date();
    }

    await confirmation.save();

    return confirmation;
  }

  async getItemsBuyed(userId: string): Promise<any | null> {
    const books = await UserEbook.findAll({
      where: {
        userId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Ebook,
          as: "book",
          attributes: ["id", "title", "code", "price", "language", "author"],
        },
        {
          model: Delivery,
          as: "delivery",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    if (!books || books.length === 0) {
      return null;
    }

    return books;
  }
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
