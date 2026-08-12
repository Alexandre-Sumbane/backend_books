import { CartDto, CartResponse } from "@/domain/Dto/Cart";
import { CartItemDto } from "@/domain/Dto/CartItem";

export interface CartRepository {
    create(cartDto: CartDto): Promise<CartResponse>;
    getUserCart(userId: string, status: string): Promise<CartResponse | null>;
    updateCart(totalAmount: number, cartId: string): Promise<CartResponse | null>;
    removeCart(cartId: string, userId: string): Promise<void | null>;
}