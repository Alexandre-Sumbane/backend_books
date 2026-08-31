import { UserEbookResponses } from "@/domain/Dto/user-ebook";
import { OrderItemDto } from "@/domain/model/orderitem";
import { UserEbookInput, UserEbookOutput } from "@/domain/model/userBook";


export interface UserBookRepository {
    addUserBook(orderItems: OrderItemDto[], userId: string): Promise<UserEbookResponses[]>
    getUserBooks(userId: string): Promise<UserEbookOutput[]>
    getUserBookById(userId: string, bookId: string): Promise<UserEbookOutput | null>
}