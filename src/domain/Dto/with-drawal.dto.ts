import { WithdrawalRequestStatus } from "../model/withdrawalrequest";


export interface ChangeWithdrawalRequestDto {
    withdrawalId: string,
    userId?: string,
    status: WithdrawalRequestStatus,
    reason?: string
}