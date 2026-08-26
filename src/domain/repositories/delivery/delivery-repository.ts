import { DeliveryDto, DeliveryOutput } from "@/domain/model/delivery";

export interface DeliveryRepository {
    create(data: DeliveryDto): Promise<DeliveryOutput>
    findDeliveryByOrderId(orderId: string): Promise<DeliveryOutput | null>
    findDeliveryById(id: string): Promise<DeliveryOutput | null>
    updateDelivery(id: string, data: DeliveryDto): Promise<DeliveryOutput | null>
    deleteDelivery(id: string): Promise<void>
}