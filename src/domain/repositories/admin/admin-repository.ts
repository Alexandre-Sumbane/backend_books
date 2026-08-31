import { OrderResponse } from "@/domain/Dto/order";
import { OrderStatus } from "@/domain/model/order";
import { WithdrawalRequestOutput, WithdrawalRequestStatus } from "@/domain/model/withdrawalrequest";


export interface ChangeWithdrawalRequestDto {
    withdrawalId: string,
    userId: string,
    status: WithdrawalRequestStatus,
    reason: string
}

export interface AdminRepository {
    changeOrderStatus(orderId: string, status: OrderStatus): Promise<OrderResponse>
    getClientConfirmations(): Promise<any | null>
    changestatusWithdrwalRequest({withdrawalId, status, reason}: ChangeWithdrawalRequestDto): Promise<WithdrawalRequestOutput | null>
}