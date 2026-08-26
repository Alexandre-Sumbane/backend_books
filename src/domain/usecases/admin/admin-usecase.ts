import { ChangeWithdrawalRequestDto } from "@/domain/Dto/with-drawal.dto";
import { WithdrawalRequestRepository } from "@/domain/repositories/withdrawalrequest/withdrawalrequest-repository";
import { HttpExceptionFactory } from "helpers/HttpExceptionFactory";


export class AdminUsecase {
    constructor(private withdrawalRepository: WithdrawalRequestRepository){} 

    async changestatusWithdrwalRequest({withdrawalId, status, reason}: ChangeWithdrawalRequestDto){

        const validStatus = ["approved", "blocked", "cancelled", "rejected"];

        if (!validStatus.includes(status)) {
          throw HttpExceptionFactory.badRequest("Status invalido!");
        }

        const withdrawal = await this.withdrawalRepository.findById(withdrawalId);

        if (!withdrawal || withdrawal == null) {
          throw HttpExceptionFactory.notFound("Solicitacao nao encontrada!");
        }

        const result = await this.withdrawalRepository.changeStatusWithdrawalRequest({withdrawalId, status, reason});

        return result;
    }
}