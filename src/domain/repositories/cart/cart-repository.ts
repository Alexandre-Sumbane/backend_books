import { CartDto, CartResponse, GetCartProps, UpdateCartDto } from "@/domain/Dto/Cart";

export interface CartRepository {
    create(cartDto: CartDto): Promise<CartResponse>;
    getUserCart({ cartId, userId, status}: GetCartProps): Promise<CartResponse | null>;
    updateCart(data: UpdateCartDto, cartId: string, userId: string): Promise<CartResponse | null>;
    cleanCart(cartId: string, userId: string): Promise<void | null>;
    removeCart(cartId: string, userId: string): Promise<void | null>;
}