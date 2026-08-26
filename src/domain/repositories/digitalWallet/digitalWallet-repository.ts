import { DigitalWalletDto, UpdateDigitalWalletOnPay } from "@/domain/Dto/digitalWallet";
export interface DigitalWalletRepository {
    create(data: DigitalWalletDto): Promise<any>
    updateOnPayment(data: UpdateDigitalWalletOnPay, id: string): Promise<any>

    // payWithMpesa(data: DigitalWalletDto): Promise<any>
}
