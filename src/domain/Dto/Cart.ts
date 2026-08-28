import { CartStatus } from "../model/cart";
import { CartItemDto } from "./CartItem";

export interface CartDto {
    userId: string;
    totalAmount: number;
}

export interface UpdateCartDto {
    totalAmount?: number
    status?: CartStatus
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
    status?: CartStatus;
    userId: string;
}