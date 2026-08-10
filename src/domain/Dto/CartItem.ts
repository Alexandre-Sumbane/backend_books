export interface CartItemDto {
    cartId: string;
    bookId: string;
    price?: number;
    quantity: number;
}

export interface CartItemResponse {
    id: string;
    cartId: string;
    bookId: string;
    quantity: number;
}