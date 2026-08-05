export interface CartItemDto {
    cartId: string;
    bookId: string;
    quantity: number;
}

export interface CartItemResponse {
    id: string;
    cartId: string;
    bookId: string;
    quantity: number;
}