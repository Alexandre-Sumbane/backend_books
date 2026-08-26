import { OrderResponse } from "@/domain/Dto/order";
import { OrderStatus } from "@/domain/model/order";

export interface ClientRepository {
    changeOrderStatus(orderId: string, status: OrderStatus, userId: string): Promise<OrderResponse>
}