import { CartItemDto, CartItemResponse } from "@/domain/Dto/CartItem";


export interface CartItemRepository {
    addItem(item: CartItemDto): Promise<CartItemResponse> 
    updateItem(item: CartItemDto): Promise<CartItemResponse | null>
    removeItem(userId: string, bookId: string): Promise<void>
}