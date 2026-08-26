import { DigitalWallet } from "@/domain/model/digitalWallet";

import { DigitalWalletRepository } from "./digitalWallet-repository";

import sequelizeConnection from "@/infra/database/config/database";

import { DigitalWalletDto, UpdateDigitalWalletOnPay } from "@/domain/Dto/digitalWallet";
import { HttpExceptionFactory } from "helpers/HttpExceptionFactory";

export class SequelizeDigitalWalletRepository implements DigitalWalletRepository {

  async create(data: DigitalWalletDto) {
    const transaction = await sequelizeConnection.transaction();

    try {

      const digitalWallet = await DigitalWallet.create(
        {
          type: data.type,
          amount: data.amount,
          userId: data.userId,
          phoneNumber: data.phoneNumber,
          paymentId: data.paymentId,
          // The gateway references are only known after the M-Pesa call.  The
          // placeholders keep older schemas, where these columns are NOT NULL,
          // valid until updateOnPayment replaces the transaction reference.
          transactionReference: data.paymentId,
          thirdPartyReference: data.paymentId,
          responseDescription: "Pagamento pendente",
        },
        {
          transaction,
        },
      );

      await transaction.commit();

      return digitalWallet;
    } catch (error: any) {

      await transaction.rollback();

      console.log("Error in creating digitalWallet:", error.message);

      throw error;
    }
   
  }

  async updateOnPayment(
  data: UpdateDigitalWalletOnPay,
  id: string
): Promise<any> {
  const transaction = await sequelizeConnection.transaction();

  try {
    const [updated] = await DigitalWallet.update(
      {
        responseCode: data.responseCode,
        responseDescription: data.responseDescription,
        transactionReference: data.transactionReference,
      },
      {
        where: {
          id: id,
        },
        transaction,
      }
    );

    if (updated === 0) {
      await transaction.rollback();

      throw HttpExceptionFactory.notFound(
        "Carteira digital não encontrada!"
      );
    }

    await transaction.commit();

    return {
      message: "Carteira digital atualizada com sucesso!",
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

}
