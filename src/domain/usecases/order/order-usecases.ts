import { CreateOrderDto } from "@/domain/Dto/order";
import { CartRepository } from "@/domain/repositories/cart/cart-repository";
import { DeliveryRepository } from "@/domain/repositories/delivery/delivery-repository";
import { LocationRepository } from "@/domain/repositories/location/location-repository";
import { OrderRepository } from "@/domain/repositories/order/order-repository";
import { get } from "axios";
import { HttpExceptionFactory } from "helpers/HttpExceptionFactory";

export class OrderUsecases {
  constructor(
    private locationRepository: LocationRepository,
    private cartRepository: CartRepository,
    private orderRepository: OrderRepository,
    private deliveryRepository: DeliveryRepository,
  ) {}

  async create(orderDto: CreateOrderDto) {
    const { delivery, cartId, userId } = orderDto;

    console.log("Delivery: ", delivery);

    let deliveryAmount = 0;
    let shippingAddress: string | undefined;
    let location;

    if (delivery?.locationId) {
      location = await this.locationRepository.findById(delivery.locationId);

      if (!location) {
        throw HttpExceptionFactory.notFound("Local não encontrado");
      }

      deliveryAmount = Number(location.price);
      shippingAddress = location.name;
    }
    const cart = await this.cartRepository.getUserCart({
      cartId,
      userId,
    });

    if (!cart) {
      throw HttpExceptionFactory.notFound("Carrinho não encontrado");
    }

    const totalAmount = Number(cart.totalAmount) + deliveryAmount;

    const order = await this.orderRepository.create({
      userId,
      cartId,
      totalAmount,
      shippingAddress,
      orderNumber: this.createOrderNumber(),
    });

    if (delivery && location) {
      const deliveryData = await this.deliveryRepository.create({
        shippingAddress: location.name,
        clientName: delivery.clientName,
        phoneNumber: delivery.phoneNumber,
        estimatedDeliveryTime: location.estimatedTime,
        orderId: order.id,
      });

      console.log("Delivery data: ", deliveryData);

      return {
        order,
        delivery: deliveryData,
      };
    }

    // 6. Produto sem delivery
    return {
      order,
      delivery: null,
    };
  }

  async getOrderById(orderId: string, userId?: string) {
    const order = await this.orderRepository.getOrderById(orderId, userId);

    if (!order) {
      throw HttpExceptionFactory.notFound("Order nao encontrada!");
    }

    return order;
  }

  async getAllOrders() {
    const orders = await this.orderRepository.getAllOrders();

    if (!orders || orders.length === 0) {
      throw HttpExceptionFactory.notFound("Nenhuma pedido foi encontrado!");
    }

    return orders;
  }

  async getUserOrders(userId: string) {
    const orders = await this.orderRepository.getUserOrders(userId);

    if (!orders || orders.length === 0) {
      throw HttpExceptionFactory.notFound("Nenhuma pedido foi encontrado!");
    }

    return orders;
  }

  private createOrderNumber() {
    const date = new Date();

    return `EBook-Order-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
  }
}
