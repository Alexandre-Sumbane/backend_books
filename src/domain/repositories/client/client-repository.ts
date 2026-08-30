import { OrderResponse } from "@/domain/Dto/order";
import { ClientConfirmationStatus } from "@/domain/model/client-confirmation";
import { OrderStatus } from "@/domain/model/order";
import { ConfirmationItemsProps } from "./sequelize-client-repository";

export interface ClientRepository {
    changeOrderStatus(orderId: string, status: OrderStatus, userId: string): Promise<OrderResponse>
    getClientOrders(userId: string): Promise<OrderResponse[] | null>
    getItemsBuyed(userId: string): Promise<any | null>
    confirmItems(data: ConfirmationItemsProps): Promise<any | null>
}