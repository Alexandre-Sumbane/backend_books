enum EbookStatus {
    pendent,
    published,
    blocked
}

export interface EbookDto {
    title: string;
    code: string;
    language: string;
    author: string;
    sinopse?: string;
    description?: string;
    price: number;
    quantity?: number;
    categoryId: string;
    format: string;
    pages?: number;
    userId?: string;
}

export interface EbookResponse {
    id: string
    code: string
    title: string
    author: string
    language: string
    sinopse?: string
    description?: string
    price: number;
    quantity?: number
    rating?: number
    totalReviews?: number
    categoryId: string 
    format: string
    pages?: number
    publishDate?: Date
    statePublisher?: EbookStatus
    userId?: string
}