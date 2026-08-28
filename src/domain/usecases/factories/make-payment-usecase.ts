import { SequelizePaymentRepository } from "@/domain/repositories/payment/sequelize-payment-repository";
import { PaymentUsecases } from "../payment/payment-usecases";
import { SequelizeOrderRepository } from "@/domain/repositories/order/sequelize-order-repository";
import { SequelizeDigitalWalletRepository } from "@/domain/repositories/digitalWallet/Sequelize-digitalWallet-repository";
import { SequelizeUserBookRepository } from "@/domain/repositories/userbook/sequelize-userbook";
import { SequelizeDeliveryRepository } from "@/domain/repositories/delivery/sequelize-delivery-repository";
import { SequelizeCartRepository } from "@/domain/repositories/cart/cart-sequelize-repository";

export function makePaymentUsecase() {
    const paymentRepository = new SequelizePaymentRepository();
    const orderRepository = new SequelizeOrderRepository();
    const digitalWalletRepository = new SequelizeDigitalWalletRepository();
    const userbookRepository = new SequelizeUserBookRepository();
    const deliveryRepository = new SequelizeDeliveryRepository();
    const cartRepository = new SequelizeCartRepository();
    
    const paymentUsecase = new PaymentUsecases(
        paymentRepository,
        orderRepository,
        digitalWalletRepository,
        userbookRepository,
        deliveryRepository,
        cartRepository
    );

    return paymentUsecase;
} 