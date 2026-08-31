import { TransactionInput, TransactionOutput } from "@/domain/model/transaction";


export interface TransactionRepository {
    create(data: TransactionInput): Promise<TransactionOutput>
}