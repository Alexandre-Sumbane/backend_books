import { OrderItemDto } from "@/domain/model/orderitem";
import { UserEbookInput, UserEbookOutput } from "@/domain/model/userBook";


export interface UserBookRepository {
    addUserBook(orderItems: OrderItemDto[], userId: string): Promise<UserEbookOutput>
    getUserBooks(userId: string): Promise<UserEbookOutput[]>
    getUserBookById(userId: string, bookId: string): Promise<UserEbookOutput | null>
}