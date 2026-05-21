export interface BookAttributes {
    id: string
    title: string
    code: string
    description: string
    price: number
    rating: number
    totalReviews: number
    categoryId: string 
    authorId?: string
    format: string
    pages?: number
    publishDate?: Date
    statePublisher?: boolean
    locationId?: string 
    userId?: string
}