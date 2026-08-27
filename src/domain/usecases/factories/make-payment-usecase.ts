import { SequelizePaymentRepository } from "@/domain/repositories/payment/sequelize-payment-repository";
import { PaymentUsecases } from "../payment/payment-usecases";
import { SequelizeOrderRepository } from "@/domain/repositories/order/sequelize-order-repository";
import { SequelizeDigitalWalletRepository } from "@/domain/repositories/digitalWallet/Sequelize-digitalWallet-repository";
import { SequelizeUserBookRepository } from "@/domain/repositories/userbook/sequelize-userbook";
import { SequelizeDeliveryRepository } from "@/domain/repositories/delivery/sequelize-delivery-repository";

export function makePaymentUsecase() {
    const paymentRepository = new SequelizePaymentRepository();
    const orderRepository = new SequelizeOrderRepository();
    const digitalWalletRepository = new SequelizeDigitalWalletRepository();
    const userbookRepository = new SequelizeUserBookRepository();
    const deliveryRepository = new SequelizeDeliveryRepository();
    
    const paymentUsecase = new PaymentUsecases(
        paymentRepository,
        orderRepository,
        digitalWalletRepository,
        userbookRepository,
        deliveryRepository
    );

    return paymentUsecase;
} 