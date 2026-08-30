import { OrderResponse } from "@/domain/Dto/order";
import { OrderStatus } from "@/domain/model/order";
import { WithdrawalRequestOutput } from "@/domain/model/withdrawalrequest";


export interface AdminRepository {
    changeOrderStatus(orderId: string, status: OrderStatus): Promise<OrderResponse>
    getClientConfirmations(): Promise<any | null>
}