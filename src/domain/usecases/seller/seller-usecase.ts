import { ChangeWithdrawalRequestDto } from "@/domain/Dto/with-drawal.dto";
import { WithdrawalRequestInput } from "@/domain/model/withdrawalrequest";
import { EarningRepository } from "@/domain/repositories/earning/earning-repositories";
import { EbookRepository } from "@/domain/repositories/ebook/ebook-repository";
import { WithdrawalRequestRepository } from "@/domain/repositories/withdrawalrequest/withdrawalrequest-repository";
import { HttpExceptionFactory } from "helpers/HttpExceptionFactory";

export class SellerUsecases {

  constructor(
    private earningRepository: EarningRepository,
    private withdrawalRepository: WithdrawalRequestRepository,
    private ebookRepository: EbookRepository
  ) {}

  async createWithdrawalRequest(data: WithdrawalRequestInput) {

    const totalAmout = await this.getSellerSituation(data.sellerId);

    if(totalAmout.balance < data.amount){
      throw HttpExceptionFactory.conflict("Saldo insuficiente!");
    }

    data.reference = this.withdrawalRepository.createReference();
    
    const withdrawalRequest = await this.withdrawalRepository.create(data);

    return withdrawalRequest;
  }
  async getSellerBooks(sellerId: string) {
    const books = await this.ebookRepository.findBySeller(sellerId);

    if (!books || books.length === 0) {
      throw HttpExceptionFactory.notFound("Livro nao encontrado!");
    }

    return books;
  }

  async getTotalEarnings(sellerId: string): Promise<{ totalEarnings: number }> {
    const bookusers = await this.earningRepository.getSellerEarnings(sellerId);

     if (!bookusers || bookusers.total === 0){
       throw HttpExceptionFactory.notFound("Nenhum livro foi encontrado!");
     }

     return {totalEarnings: bookusers.total}
  }

  async getTotalEarningsComplete(sellerId: string, token: string) {
    const earnings = await this.earningRepository.getTotalEarningsComplete(sellerId, token);

    if(!earnings){
      throw HttpExceptionFactory.notFound("Ganhos nao encontrados!");
    }

    return earnings
  }

async getSellerSituation(sellerId: string): Promise<any> {
  const situation = await this.earningRepository.getSellerSituation(sellerId);

  if(!situation){
    throw HttpExceptionFactory.notFound("Situacao nao encontrada!");
  }

  return situation;
}
  
  async changestatusWithdrwalRequest({withdrawalId, userId, status, reason}: ChangeWithdrawalRequestDto) {

      const validStatus = ["cancelled"];
  
      if (!validStatus.includes(status)) {
        throw HttpExceptionFactory.badRequest("Status invalido!");
      }

      const withdrawal = await this.withdrawalRepository.findById(withdrawalId);

      if (!withdrawal || withdrawal == null) {
        throw HttpExceptionFactory.notFound("Solicitacao nao encontrada!");
      }

      if (withdrawal.status === status) {
        throw HttpExceptionFactory.conflict("Estas a tentar adicionar o mesmo status!");
      }

      const result = await this.withdrawalRepository.changeStatusWithdrawalRequest({withdrawalId, userId, status, reason});


  }

}