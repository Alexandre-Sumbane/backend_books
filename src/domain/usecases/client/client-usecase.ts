import { OrderStatus } from "@/domain/model/order";
import { ClientRepository } from "@/domain/repositories/client/client-repository";
import { ConfirmationItemsProps } from "@/domain/repositories/client/sequelize-client-repository";
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

  async getItemsBuyed(userId: string): Promise<any | null> {
    const books = await this.clientRepository.getItemsBuyed(userId);

    if (!books || books == null) {
      throw HttpExceptionFactory.notFound("Nenhum livro foi encontrado!");
    }

    return books;
  }

  async confirmationItems(data: ConfirmationItemsProps): Promise<any | null> {

    const availableStatus  = ["received", "notReceived", "cancelled"];

    if(!availableStatus.includes(data.status)) {
      throw HttpExceptionFactory.badRequest("Status invalido!");
    }
    
    const result = await this.clientRepository.confirmItems(data);

    if(!result) {
      throw HttpExceptionFactory.notFound("Pedido nao encontrado!");
    }

    return result;
  }  
}
