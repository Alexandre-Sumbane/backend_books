import {
  Transaction,
  TransactionInput,
  TransactionOutput,
} from "@/domain/model/transaction";
import sequelizeConnection from "@/infra/database/config/database";

import { TransactionRepository } from "./transaction-repository";

export class SequelizeTransactionRepository implements TransactionRepository {
  async create({ amount, bookId, type, userId, sellerId, status, quantity }: TransactionInput) {

    console.log("amount", amount)
    console.log("bookId", bookId)
    console.log("type", type)
    console.log("userId", userId)
    console.log("sellerId", sellerId)
    console.log("status", status)
    console.log("quantity", quantity)

    const transaction = await sequelizeConnection.transaction();

    try {
      const addTransaction = await Transaction.create(
        {
          amount,
          bookId,
          type,
          userId,
          sellerId,
          status,
          quantity
        },
        {
          transaction,
        },
      );

      await transaction.commit();

      return addTransaction as TransactionOutput;
    } catch (error: any) {
      console.log("Erro ao criar Transaction:", error);

      await transaction.rollback();

      throw error;
    }
  }
}
