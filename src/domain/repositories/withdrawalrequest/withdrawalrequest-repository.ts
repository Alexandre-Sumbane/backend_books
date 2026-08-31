import { ChangeWithdrawalRequestDto } from "@/domain/Dto/with-drawal.dto";
import { WithdrawalRequestInput, WithdrawalRequestOutput } from "@/domain/model/withdrawalrequest";

export interface WithdrawalRequestRepository {
    create(data: WithdrawalRequestInput): Promise<WithdrawalRequestOutput>
    findById(withdrawalId: string): Promise<WithdrawalRequestOutput | null>
    changeStatusWithdrawalRequest(data: ChangeWithdrawalRequestDto): Promise<WithdrawalRequestOutput>
    createReference(): string
}