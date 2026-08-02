enum EbookStatus {
    pendent,
    published,
    blocked
}

export interface EbookDto {
    title: string
    code: string
    author: string
    description: string
    price: number
    categoryId: string 
    format: string
    pages?: number
    userId?: string
}

export interface EbookResponse {
    id: string
    code: string
    title: string
    author: string
    description: string
    price: number
    rating?: number
    totalReviews?: number
    categoryId: string 
    format: string
    pages?: number
    publishDate?: Date
    statePublisher?: EbookStatus
    userId?: string
}