import { CartDto, CartResponse } from "@/domain/Dto/Cart";

export interface CartRepository {
    addItemsToCart(cartDto: CartDto, userId: string): Promise<CartResponse>;
    getUserCart(userId: string, status: string): Promise<CartResponse | null>;
    // updateCart(item: CartDto, cartId: string): Promise<CartResponse | null>;
    removeCart(cartId: string, userId: string): Promise<void | null>;
}