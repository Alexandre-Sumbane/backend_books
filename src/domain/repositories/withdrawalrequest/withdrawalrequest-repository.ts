import { ChangeWithdrawalRequestDto } from "@/domain/Dto/with-drawal.dto";
import { WithdrawalRequestOutput } from "@/domain/model/withdrawalrequest";

export interface WithdrawalRequestRepository {
    findById(withdrawalId: string): Promise<WithdrawalRequestOutput | null>
    changeStatusWithdrawalRequest(data: ChangeWithdrawalRequestDto): Promise<WithdrawalRequestOutput>
}