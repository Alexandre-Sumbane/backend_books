import { CartItemDto } from "./CartItem";

export interface CartDto {
    userId: string;
    totalAmount: number;
}


export interface CartResponse {
    id: string;
    userId: string;
    totalAmount: number;
    status: string;
    cartItems?: CartItemDto[];
}

export interface GetCartProps {
    cartId?: string;
    userId: string;
}