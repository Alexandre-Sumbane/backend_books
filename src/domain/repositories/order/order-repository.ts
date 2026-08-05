import { CreateOrder,  OrderResponse } from "@/domain/Dto/order";

export interface OrderRepository {
  create(orderDto: CreateOrder): Promise<OrderResponse>;
  getUserOrder(userId: string, status: string): Promise<OrderResponse | null>;
  // updateOrder(item: CartDto, cartId: string): Promise<CartResponse | null>;
  removeOrder(orderId: string, userId: string): Promise<void | null>;
}
