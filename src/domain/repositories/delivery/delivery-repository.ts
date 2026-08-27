import { DeliveryDto, DeliveryOutput, DeliveryStatus } from "@/domain/model/delivery";

export interface DeliveryRepository {
    create(data: DeliveryDto): Promise<DeliveryOutput>
    findDeliveryByOrderId(orderId: string): Promise<DeliveryOutput | null>
    findDeliveryById(id: string): Promise<DeliveryOutput | null>
    updateDelivery(id: string, data: DeliveryDto): Promise<DeliveryOutput | null>
    updateDeliveryStatus(id: string, status: DeliveryStatus): Promise<DeliveryOutput | null>
    deleteDelivery(id: string): Promise<void>
}