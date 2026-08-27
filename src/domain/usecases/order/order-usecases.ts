import { CreateOrderDto } from "@/domain/Dto/order";
import { CartRepository } from "@/domain/repositories/cart/cart-repository";
import { DeliveryRepository } from "@/domain/repositories/delivery/delivery-repository";
import { LocationRepository } from "@/domain/repositories/location/location-repository";
import { OrderRepository } from "@/domain/repositories/order/order-repository";
import { HttpExceptionFactory } from "helpers/HttpExceptionFactory";

export class OrderUsecases {
  constructor(
    private locationRepository: LocationRepository,
    private cartRepository: CartRepository,
    private orderRepository: OrderRepository,
    private deliveryRepository: DeliveryRepository,
  ) {}

  // async create(orderDto: CreateOrderDto) {
  //   const { delivery, cartId, userId } = orderDto;

  //   let deliveryAmount = 0;
  //   let shippingAddress = "";
  //   let deliveryData;
  //   let location;

  //   if (delivery?.locationId) {
  //     const { locationId } = delivery;

  //     location = await this.locationRepository.findById(locationId);

  //     if (!location) {
  //       throw HttpExceptionFactory.notFound("Local nao encontrado");
  //     }

  //     deliveryAmount = location.price;
  //     shippingAddress = location.name;
  //   }

  //   const cart = await this.cartRepository.getUserCart(cartId, userId);

  //   if (!cart) {
  //     throw HttpExceptionFactory.notFound("Carrinho nao encontrado");
  //   }

  //   const totalAmount = Number(deliveryAmount) + Number(cart.totalAmount);
  //   const orderNumber = this.createOrderNumber();

  //   const order = await this.orderRepository.create({
  //     userId,
  //     cartId,
  //     totalAmount,
  //     shippingAddress,
  //     orderNumber,
  //   });

  //   if (delivery) {
  //     deliveryData = await this.deliveryRepository.create({
  //       shippingAddress,
  //       clientName: delivery.clientName,
  //       phoneNumber: delivery.phoneNumber,
  //       estimatedDeliveryTime: location?.estimatedTime,
  //       orderId: order.id,
  //     });
  //   }

  //   return {
  //     order,
  //     delivery: deliveryData,
  //   };
  // }

  async create(orderDto: CreateOrderDto) {
  const { delivery, cartId, userId } = orderDto;

  let deliveryAmount = 0;
  let shippingAddress: string | undefined;
  let deliveryData;
  let location;

  // Se houver delivery, procurar a localização
  if (delivery?.locationId) {
    location = await this.locationRepository.findById(
      delivery.locationId
    );

    if (!location) {
      throw HttpExceptionFactory.notFound(
        "Local não encontrado"
      );
    }

    deliveryAmount = Number(location.price);
    shippingAddress = location.name;
  }

  // Procurar carrinho do utilizador
  const cart = await this.cartRepository.getUserCart(
    {
     cartId: cartId,
     userId: userId 
    });

  if (!cart) {
    throw HttpExceptionFactory.notFound(
      "Carrinho não encontrado"
    );
  }

  // Calcular total
  const totalAmount =
    Number(cart.totalAmount) + deliveryAmount;

  // Criar número da encomenda
  const orderNumber = this.createOrderNumber();

  // Criar encomenda
  const order = await this.orderRepository.create({
    userId,
    cartId,
    totalAmount,
    shippingAddress,
    orderNumber,
  });

  // Criar delivery apenas se realmente existir
  if (delivery?.locationId) {
    console.log("Delivery:", delivery);
    
    deliveryData = await this.deliveryRepository.create({
      shippingAddress: shippingAddress!,
      clientName: delivery.clientName,
      phoneNumber: delivery.phoneNumber,
      estimatedDeliveryTime: location!.estimatedTime,
      orderId: order.id,
    });
  }

  return {
    order,
    delivery: deliveryData,
  };
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
