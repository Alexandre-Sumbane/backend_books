import { MakeCartUsecase } from "@/domain/usecases/factories/make-order-usecase";
import { BusinessException } from "@/Exceptions/BusinessExceptions";

import { Request, Response } from "express";

const orderUsecase = MakeCartUsecase();

export class OrderController {
 static async create(req: Request, res: Response): Promise<Response> {
    const { cartId, locationId } = req.body;

    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Usuário não autenticado",
        });
      }

      const order = await orderUsecase.create({locationId, cartId, userId: req.user.userId});

      return res.status(200).json({
        success: true,
        message: "Itens adicionados ao carrinho com sucesso!",
        order
      });
    } catch (error: any) {
        console.log("Erro ao Adicionar itens ao carrinho:", error);
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao adicionar itens ao criar order, tente novamente",
      })
    }
  }
}
