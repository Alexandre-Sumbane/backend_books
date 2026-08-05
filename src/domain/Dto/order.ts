
export interface OrderItemDto {
    orderId: string;
    bookId: string;
    price: number;
    quantity: number;
}

export interface CreateOrder {
    totalAmount?: number | null;
    userId: string;
    cartId?: string | null;
    orderNumber: string;
    shippingAddress?: string | null;
    orderItems: OrderItemDto[];
}


export interface CreateOrderDto {

    items: OrderItemDto[];

    shippingAddress: string;
}


export interface OrderResponse {
    id: string;
    orderNumber: string;
    totalAmount?: number | null;
    status: string;
    shippingAddress?: string | null;
    userId: string;
    cartId?: string | null;
}