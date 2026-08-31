import { CreateDigitalWalletDto } from "@/domain/Dto/digitalWallet";
import { PaymentMethod } from "@/domain/model/payment";

import { PaymentDto, PaymentStatus } from "@/domain/Dto/payment";
import { DigitalWalletRepository } from "@/domain/repositories/digitalWallet/digitalWallet-repository";
import { OrderRepository } from "@/domain/repositories/order/order-repository";
import { PaymentRepository } from "@/domain/repositories/payment/payment-repository";

import axios from "axios";
import { env } from "@/env";

import { HttpExceptionFactory } from "helpers/HttpExceptionFactory";
import { OrderStatus } from "@/domain/model/order";
import { UserBookRepository } from "@/domain/repositories/userbook/userRepository";
import { OrderItemDto } from "@/domain/model/orderitem";
import { DeliveryRepository } from "@/domain/repositories/delivery/delivery-repository";
import { DeliveryStatus } from "@/domain/model/delivery";
import { CartRepository } from "@/domain/repositories/cart/cart-repository";
import { CartStatus } from "@/domain/model/cart";
import { BusinessException } from "@/Exceptions/BusinessExceptions";
import { TransactionRepository } from "@/domain/repositories/transaction/transaction-repository";
import { TransactionInput, TransactionStatus, TransactionType } from "@/domain/model/transaction";
import { UserEbookOutput } from "@/domain/model/userBook";
import { UserEbookResponses } from "@/domain/Dto/user-ebook";

interface UserBookAssociationDto {
  orderItems?: OrderItemDto[];
  userId: string;
}

export class PaymentUsecases {
  constructor(
    private paymentRepository: PaymentRepository,
    private orderRepository: OrderRepository,
    private digitalWalletRepository: DigitalWalletRepository,
    private userbookRepository: UserBookRepository,
    private deliveryRepository: DeliveryRepository,
    private cartRepository: CartRepository,
    private transactionRepository: TransactionRepository,
  ) {}

  async createPayment(data: PaymentDto, token: string): Promise<any> {
    const order = await this.orderRepository.getOrderById(data.orderId);

    if (!order) {
      throw HttpExceptionFactory.notFound("Pedido não encontrado");
    }

    if (order.status !== OrderStatus.pending) {
      throw HttpExceptionFactory.conflict("Pedido ja foi processado!");
    }

    const payment = await this.paymentRepository.createPayment(data);

    if (!payment) {
      throw HttpExceptionFactory.conflict("Pagamento nao criado!");
    }

    const digitalWallet = await this.digitalWallet(
      {
        amount: order.totalAmount || 0,
        userId: data.userId,
        phoneNumber: data.phoneNumber || "",
        paymentId: payment.id,
        type: data.paymentMethod,
        orderId: data.orderId,
        shippingAddress: order.shippingAddress || undefined,
      },
      token,
    );

    if (!digitalWallet) {
      throw HttpExceptionFactory.conflict("Pagamento nao criado!");
    }

    return {
      digitalWallet,
    };
  }

  private async digitalWallet(data: CreateDigitalWalletDto, token: string) {
    switch (data.type) {
      case PaymentMethod.mpesa:
        {
          const mpesa = await this.payWithMpesa(data, token);

          return mpesa;
        }

        break;
    }
  }

  async payWithMpesa(
    data: CreateDigitalWalletDto,
    token: string,
  ): Promise<any> {
    try {
      const order = await this.orderRepository.getOrderById(data.orderId);

      if (!order) {
        throw HttpExceptionFactory.notFound("Pedido nao encontrado!");
      }

      const payment = await this.paymentRepository.getPaymentById(
        data.paymentId,
      );

      if (!payment) {
        throw HttpExceptionFactory.conflict("Pagamento nao criado!");
      }

      const mpesa = await this.digitalWalletRepository.create({
        type: PaymentMethod.mpesa,
        amount: data.amount,
        userId: data.userId,
        phoneNumber: data.phoneNumber,
        paymentId: payment.id,
      });

      const gateway = await this.mpesaGateway(
        {
          amount: data.amount,
          phoneNumber: data.phoneNumber,
          paymentMethod: "mpesa",
          service: "books",
          serviceId: data.orderId,
          userId: data.userId,
        },
        token,
      );

      const paymentStatus = gateway.success
        ? PaymentStatus.completed
        : PaymentStatus.failed;

      await this.paymentRepository.updatePayment(payment?.id!, {
        status: paymentStatus,
        reference: gateway.reference,
      });

      await this.digitalWalletRepository.updateOnPayment(
        {
          transactionReference: gateway.reference,
          responseDescription: gateway.mensagem,
          responseCode: gateway.statusCode,
        },
        mpesa.id,
      );

      await this.errorHadle(gateway.statusCode, gateway.mensagem);

      if (paymentStatus === PaymentStatus.completed) {
        if (data.shippingAddress) {
          await this.orderRepository.updateStatus(
            { status: OrderStatus.processing },
            order.id,
          );

          await this.deliveryRepository.updateDeliveryStatus(
            order.id,
            DeliveryStatus.processing,
          );

          const userBook = await this.userbookAssociation({
            orderItems: order.orderItems,
            userId: data.userId,
          });

          await this.cartRepository.updateCart(
            {
              status: CartStatus.paid,
            },
            order.cartId,
            data.userId,
          );

          await this.addTransaction(userBook);
        } else {
          const userBook = await this.userbookAssociation({
            orderItems: order.orderItems,
            userId: data.userId,
          });

          await this.orderRepository.updateStatus(
            { status: OrderStatus.completed },
            order.id,
          );

           await this.cartRepository.updateCart(
            {
              status: CartStatus.paid,
            },
            order.cartId,
            data.userId,
          );

          await this.addTransaction(userBook);
        }
      } else {
        await this.orderRepository.updateStatus(
          { status: OrderStatus.pending },
          order.id,
        );

        await this.cartRepository.updateCart(
          {
            status: CartStatus.pending,
          },
          order.cartId,
          data.userId,
        );
      }

      return { order, payment, mpesa };
    } catch (error: any) {
      console.log(error);

      if (error instanceof BusinessException) {
        throw error;
      }

      console.error("Erro no processPayment:", error.message);

      throw new Error(`Erro ao processar pagamento: ${error.message}`);
    }
  }

  private async mpesaGateway(body: any, token: string) {
    const { amount, phoneNumber, paymentMethod, service, serviceId, userId } =
      body;

    try {
      const response = await axios.post(
        `${env.PAYMENT_SERVICE_URL}/payments/create`,
        {
          paymentMethod: paymentMethod,
          phoneNumber: phoneNumber,
          service: service,
          description: "Compra de Tickets",
          serviceId: serviceId,
          amount: amount,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const statusCode = response.data.mpesa.responseCode;

      let data;

      try {
        data = await response.data;
      } catch {
        data = null;
      }

      if (statusCode === 200 || statusCode === 201) {
        return {
          success: true,
          reference: response.data.mpesa.reference,
          statusCode,
          mensagem: "Pagamento aprovado",
        };
      } else if (statusCode === 400) {
        return {
          success: false,
          reference: response.data.mpesa.reference,
          statusCode,
          mensagem: "Falha no pagammento, falhou PIN",
        };
      } else if (statusCode === 422) {
        return {
          success: false,
          reference: response.data.mpesa.reference,
          statusCode,
          mensagem: "Saldo insuficiente para o pagamento",
        };
      } else if (statusCode === 408) {
        return {
          success: false,
          reference: response.data.mpesa.reference,
          statusCode,
          mensagem: "Timeout, levou muito tempo",
        };
      } else {
        return {
          success: false,
          reference: response.data.mpesa.reference,
          statusCode,
          mensagem: `Falha no pagammento, Erro: ${data?.output_ResponseDesc}`,
        };
      }
    } catch (error: any) {
      console.error("Erro Mpesa:", error.message);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 408) {
          return {
            success: false,
            reference: error.response.data?.mpesa?.reference ?? null,
            statusCode: 408,
            mensagem: "Timeout, levou muito tempo",
          };
        }

        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
      }

      throw new Error(`Falha ao processar pagamento Mpesa: ${error.message}`);
    }
  }
  private async userbookAssociation({
    orderItems,
    userId,
  }: UserBookAssociationDto) {
    if (!orderItems || orderItems.length === 0) {
      throw HttpExceptionFactory.notFound("Itens nao encontrados");
    }

    const userBook = await this.userbookRepository.addUserBook(
      orderItems,
      userId,
    );

    return userBook;
  }

  private async errorHadle(status: number, message: string) {
    if (status >= 300) {
      throw HttpExceptionFactory.badRequest(message);
    }
  }

  private async addTransaction(
  userBooks: UserEbookResponses[]
) {
  const transactions = [];

  for (const book of userBooks) {
    const transaction =
      await this.transactionRepository.create({
        userId: book.userId,
        bookId: book.ebookId,
        type: TransactionType.sale,
        amount: Number(book.book.price)*book.quantity,
        sellerId: book.book.sellerId,
        status: TransactionStatus.confirmed,
        quantity: book.quantity
      });

    transactions.push(transaction);
  }

  return transactions;
}
}
