import { CreatePaymentDto, PaymentDto, PaymentResponse, UpdatePaymentDto } from "@/domain/Dto/payment";

export interface PaymentRepository {
    createPayment(data: PaymentDto): Promise<PaymentResponse>;
    getAllPayments(): Promise<PaymentResponse[] | null>;
    getPaymentById(id: string): Promise<PaymentResponse | null>;
    updatePayment(id: string, data: UpdatePaymentDto): Promise<PaymentResponse | null>;
    deletePayment(id: string): Promise<void>;
}