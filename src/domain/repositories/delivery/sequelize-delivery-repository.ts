import { Delivery, DeliveryDto, DeliveryOutput } from "@/domain/model/delivery";
import { DeliveryRepository } from "./delivery-repository";


export class SequelizeDeliveryRepository implements DeliveryRepository{
    
    async create(data: DeliveryDto){
       
        const delivery = await Delivery.create(data);

        return delivery as DeliveryOutput;
    }

    async findDeliveryByOrderId(orderId: string){

        const delivery = await Delivery.findOne({where: {orderId}});

        if(!delivery){
            return null;
        }
        return delivery as DeliveryOutput;
    }

    async findDeliveryById(id: string){

        const delivery = await Delivery.findOne({where: {id}});

        if(!delivery){
            return null;
        }

        return delivery as DeliveryOutput;
    }

    async updateDelivery(id: string, data: DeliveryDto){
        const delivery = await Delivery.findOne({where: {id}});

        await delivery?.update(data);

        return delivery as DeliveryOutput;
    }

    async deleteDelivery(id: string){
        
        await Delivery.destroy({where: {id}});
    }
}