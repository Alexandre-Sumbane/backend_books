import { UserEbookInput, UserEbookOutput } from "@/domain/model/userBook";


export interface UserBookRepository {
    addUserBook(input: UserEbookInput): Promise<UserEbookOutput>
    getUserBooks(userId: string): Promise<UserEbookOutput[]>
    getUserBookById(userId: string, bookId: string): Promise<UserEbookOutput | null>
}