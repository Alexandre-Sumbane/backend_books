import { CreateOrderDto } from "@/domain/Dto/order";
import { CartRepository } from "@/domain/repositories/cart/cart-repository";
import { LocationRepository } from "@/domain/repositories/location/location-repository";
import { OrderRepository } from "@/domain/repositories/order/order-repository";
import { HttpExceptionFactory } from "helpers/HttpExceptionFactory";

export class OrderUsecases {
  constructor(
    private locationRepository: LocationRepository,
    private cartRepository: CartRepository,
    private orderRepository: OrderRepository,
  ) {}

  async create(orderDto: CreateOrderDto) {
      const {locationId, cartId, userId } = orderDto;

      let deliveryAmount = 0;
      let shippingAddress="";

      if(locationId) {

        const location = await this.locationRepository.findById(locationId);

        if(!location) {
          throw HttpExceptionFactory.notFound("Local nao encontrado");
        }

        deliveryAmount = location.price;
        shippingAddress = location.name;

      }

      const cart = await this.cartRepository.getUserCart(cartId, userId);

      if(!cart) {
        throw HttpExceptionFactory.notFound("Carrinho nao encontrado");
      }

      const totalAmount = Number(deliveryAmount) + Number(cart.totalAmount);
      const orderNumber = this.createOrderNumber();
    

      const order = await this.orderRepository.create({
        userId,
        cartId,
        totalAmount,
        shippingAddress,
        orderNumber
      });

      return order;
  }

   async getAllOrders(){

    const orders = await this.orderRepository.getAllOrders();

    if(!orders || orders.length === 0) {
      throw HttpExceptionFactory.notFound("Nenhuma pedido foi encontrado!");
    }

    return orders

  }

  async getUserOrders(userId: string){

    const orders = await this.orderRepository.getUserOrders(userId);

    if(!orders || orders.length === 0) {
      throw HttpExceptionFactory.notFound("Nenhuma pedido foi encontrado!");
    }

    return orders

  }

  private createOrderNumber() {

    const date = new Date();

    return `EBook-Order-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`

  }


    
}
