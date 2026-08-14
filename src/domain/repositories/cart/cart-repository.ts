import { CartDto, CartResponse } from "@/domain/Dto/Cart";

export interface CartRepository {
    create(cartDto: CartDto): Promise<CartResponse>;
    getUserCart(cartId: string, userId: string): Promise<CartResponse | null>;
    updateCart(totalAmount: number, cartId: string): Promise<CartResponse | null>;
    removeCart(cartId: string, userId: string): Promise<void | null>;
}