export interface SellerRepository {
   changeStatusWithdrawalRequest(withdrawalId: string, status: string): Promise<any>
}