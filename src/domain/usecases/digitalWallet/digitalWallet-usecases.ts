import { DigitalWalletDto } from "@/domain/Dto/digitalWallet";
import { DigitalWallet } from "@/domain/model/digitalWallet";
import { DigitalWalletRepository } from "@/domain/repositories/digitalWallet/digitalWallet-repository";

export class DigitalWalletUsecases {

    constructor(
        private digitalWalletRepository: DigitalWalletRepository
    ){}

    async create(data: DigitalWalletDto){
        const {
            amount, 
            paymentId,
            phoneNumber,
            type,
            userId
        } = data;

        const digitalWallet = await this.digitalWalletRepository.create({
            amount,
            paymentId,
            phoneNumber,
            type,
            userId
        });

        return digitalWallet;
    }
}