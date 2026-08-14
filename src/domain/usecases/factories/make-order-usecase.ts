import { SequelizeOrderRepository } from "@/domain/repositories/order/sequelize-order-repository";
import { OrderUsecases } from "../order/order-usecases";
import { SequelizeLocationsRepository } from "@/domain/repositories/location/sequelize-location-repository";
import { SequelizeCartRepository } from "@/domain/repositories/cart/cart-sequelize-repository";

export function MakeCartUsecase(){ 
    const orderRepository = new SequelizeOrderRepository();
    const locationRepository = new SequelizeLocationsRepository();
    const cartRepository = new SequelizeCartRepository()
    const cartUsecas = new OrderUsecases( locationRepository, cartRepository, orderRepository);

    return cartUsecas;
}