import { PaymentMethod, PaymentStatus } from "../model/payment";

export { PaymentStatus };

export interface CreatePaymentDto {
  // amount: number;
  paymentMethod: PaymentMethod;
  status?: PaymentStatus;
  reference?: string;
  reason?: string;
  shippingAddress?: string;
  orderId: string;
  userId: string;
  phoneNumber?: string
}

export interface PaymentDto {
  paymentMethod: PaymentMethod;
  orderId: string;
  userId: string;
  phoneNumber?: string
}

export interface UpdatePaymentDto {
  // paymentMethod: PaymentMethod;
  // amount: number;
  status: PaymentStatus;
  reason?: string;
  shippingAddress?: string;
  phoneNumber?: string;
  reference: string
}


export interface PaymentResponse{
  id: string;
  paymentMethod: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  transactionDate: Date;
  reference: string;
  reason?: string;
  shippingAddress?: string;
  orderId: string;
  userId: string;
  phoneNumber?: string
}

