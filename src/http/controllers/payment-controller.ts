import { makePaymentUsecase } from "@/domain/usecases/factories/make-payment-usecase";
import { BusinessException } from "@/Exceptions/BusinessExceptions";

import { Request, Response } from "express";

const paymentUsecase = makePaymentUsecase();
export class PaymentController {
  static async createPayment(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Usuário não autenticado",
        });
      }

      const data = {
        paymentMethod: req.body.paymentMethod,
        phoneNumber: req.body.phoneNumber,
        orderId: req.body.orderId,
        userId: req.user.userId,
      };

      const payment = await paymentUsecase.createPayment(
        data,
        req.user?.token!,
      );

      return res.status(201).json({
        success: true,
        message: "Pagamento criado com sucesso!",
        payment,
      });
    } catch (error: any) {
      console.log(error);

      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao criar pagamento, tente novamente!",
      });
    }
  }
}
