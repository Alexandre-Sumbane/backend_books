import { MakeCartUsecase } from "@/domain/usecases/factories/make-cart-usecase";
import { BusinessException } from "@/Exceptions/BusinessExceptions";

import { Request, Response } from "express";

const cartUsecase = MakeCartUsecase();

export class CartController {
  static async addToCart(req: Request, res: Response): Promise<Response> {
    const { items } = req.body;

    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Usuário não autenticado",
        });
      }

      const user = await cartUsecase.addItemsToCart(items, req.user.userId);

      return res.status(200).json({
        success: true,
        message: "Itens adicionados ao carrinho com sucesso!",
        user,
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
        message: "Ocorreu erro ao adicionar itens ao carrinho, tente novamente",
      });
    }
  }

  static async getCart(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Usuário não autenticado",
        });
      }

      const userId = req.user.userId as string;

      const cart = await cartUsecase.getCart(userId);

      return res.status(200).json({
        success: true,
        message: "Carrinho obtido com sucesso!",
        cart,
      });
    } catch (error: any) {
      console.log("Erro ao buscar carrinho:", error);

      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao buscar carrinho, tente novamente",
      });
    }
  }
}
