import { PaymentMethod } from "../model/payment";


export interface CreateDigitalWalletDto {
    amount: number;
    userId: string;
    phoneNumber: string;
    paymentId: string
    type: PaymentMethod;
    orderId: string
    shippingAddress?: string
}

export interface DigitalWalletDto {
    amount: number;
    userId: string;
    phoneNumber: string;
    paymentId: string
    type: PaymentMethod;
}

export interface UpdateDigitalWalletOnPay {
    transactionReference: string,
    responseDescription: string,
    responseCode: string
}

