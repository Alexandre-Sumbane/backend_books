import { SequelizeOrderRepository } from "@/domain/repositories/order/sequelize-order-repository";
import { OrderUsecases } from "../order/order-usecases";
import { SequelizeLocationsRepository } from "@/domain/repositories/location/sequelize-location-repository";
import { SequelizeCartRepository } from "@/domain/repositories/cart/cart-sequelize-repository";
import { SequelizeDeliveryRepository } from "@/domain/repositories/delivery/sequelize-delivery-repository";

export function MakeOrderUsecase() {
  const orderRepository = new SequelizeOrderRepository();
  const locationRepository = new SequelizeLocationsRepository();
  const cartRepository = new SequelizeCartRepository();
  const deliveryRepository = new SequelizeDeliveryRepository();
  const cartUsecas = new OrderUsecases(
    locationRepository,
    cartRepository,
    orderRepository,
    deliveryRepository,
  );

  return cartUsecas;
}
