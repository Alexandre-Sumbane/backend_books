import { SequelizeClientRepository } from "@/domain/repositories/client/sequelize-client-repository";
import { ClientUsecase } from "../client/client-usecase";
import { SequelizeOrderRepository } from "@/domain/repositories/order/sequelize-order-repository";


export function MakeClientUsecase(){
    const clientRepository = new SequelizeClientRepository();
    const orderRepository = new SequelizeOrderRepository();
    const clientUsecase = new ClientUsecase(orderRepository, clientRepository);

    return clientUsecase;
}