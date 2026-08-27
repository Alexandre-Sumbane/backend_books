import { CartDto, CartResponse, GetCartProps } from "@/domain/Dto/Cart";

export interface CartRepository {
    create(cartDto: CartDto): Promise<CartResponse>;
    getUserCart({ cartId, userId}: GetCartProps): Promise<CartResponse | null>;
    updateCart(totalAmount: number, cartId: string): Promise<CartResponse | null>;
    removeCart(cartId: string, userId: string): Promise<void | null>;
}