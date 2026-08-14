
export interface OrderItemDto {
    orderId: string;
    bookId: string;
    price: number;
    quantity: number;
}

export interface CreateOrder {
    orderNumber: string;
    totalAmount: number;
    userId: string;
    cartId: string;
    shippingAddress?: string | null;
}


export interface CreateOrderDto {
    cartId: string;
    locationId?: string;
    userId: string;
}


export interface OrderResponse {
    id: string;
    orderNumber: string;
    totalAmount?: number | null;
    status: string;
    shippingAddress?: string | null;
    userId: string;
}