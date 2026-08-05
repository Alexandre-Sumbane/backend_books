
export interface CartDto {
    userId: string;
    totalAmount?: number | null;
}


export interface CartResponse {
    id: string;
    userId: string;
    totalAmount?: number | null;
    status: string;
}