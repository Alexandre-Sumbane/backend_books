import { EbookResponse } from "./Book";


export interface UserEbookResponses {
    id: string;
    userId: string;
    ebookId: string;
    quantity: number;
    status: string;
    book: EbookResponse
}