import { SequelizePaymentRepository } from "@/domain/repositories/payment/sequelize-payment-repository";
import { PaymentUsecases } from "../payment/payment-usecases";
import { SequelizeOrderRepository } from "@/domain/repositories/order/sequelize-order-repository";
import { SequelizeDigitalWalletRepository } from "@/domain/repositories/digitalWallet/Sequelize-digitalWallet-repository";

export function makePaymentUsecase() {
    const paymentRepository = new SequelizePaymentRepository();
    const orderRepository = new SequelizeOrderRepository();
    const digitalWalletRepository = new SequelizeDigitalWalletRepository();
    
    const paymentUsecase = new PaymentUsecases(
        paymentRepository,
        orderRepository,
        digitalWalletRepository
    );

    return paymentUsecase;
} 