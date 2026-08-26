import { CreateOrder,  OrderResponse, UpdateStatusDto } from "@/domain/Dto/order";

export interface OrderRepository {
  create(orderDto: CreateOrder): Promise<OrderResponse>;
  // update(orderId: string, orderDto: CreateOrder): Promise<OrderResponse | null>;
  getOrderById(orderId: string): Promise<OrderResponse | null>;
  getAllOrders(): Promise<OrderResponse[] | null>;
  getUserOrders(userId: string): Promise<OrderResponse[] | null>;
  updateStatus(item: UpdateStatusDto, orderId: string): Promise<OrderResponse | null>;
  removeOrder(orderId: string, userId: string): Promise<void | null>;
}
