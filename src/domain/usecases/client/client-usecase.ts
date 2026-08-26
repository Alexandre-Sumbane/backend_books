import { OrderStatus } from "@/domain/model/order";
import { ClientRepository } from "@/domain/repositories/client/client-repository";
import { OrderRepository } from "@/domain/repositories/order/order-repository";
import { HttpExceptionFactory } from "helpers/HttpExceptionFactory";

export class ClientUsecase {
  constructor(
    private orderRepository: OrderRepository,
    private clientRepository: ClientRepository,
  ) {}

  async changeOrderStatus(
    orderId: string,
    status: OrderStatus,
    userId: string,
  ) {
    const validStatus = ["shipped", "delivered", "completed", "cancelled"];

    if (!validStatus.includes(status)) {
      throw HttpExceptionFactory.badRequest("Status invalido!");
    }

    const order = await this.orderRepository.getOrderById(orderId);

    if (!order) {
      throw HttpExceptionFactory.notFound("Order nao encontrada!");
    }

    const result = await this.clientRepository.changeOrderStatus(
      orderId,
      status,
      userId,
    );

    return result;
  }
}
