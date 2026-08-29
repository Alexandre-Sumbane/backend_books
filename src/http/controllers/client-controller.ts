import { MakeClientUsecase } from "@/domain/usecases/factories/make-client-usecase";
import { MakeOrderUsecase } from "@/domain/usecases/factories/make-order-usecase";
import { BusinessException } from "@/Exceptions/BusinessExceptions";
import { Request, Response } from "express";

const orderUsecase = MakeOrderUsecase();
const clientUsecase = MakeClientUsecase();

export class ClientController {
  static async getUserOrders(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Usuário não autenticado",
        });
      }

      const orders = await orderUsecase.getUserOrders(req.user.userId);

      return res.status(200).json({
        success: true,
        orders,
      });
    } catch (error: any) {
      console.log("Erro ao buscar pedidos do usuário:", error);
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao buscar pedidos do usuário, tente novamente",
      });
    }
  }

  static async changeOrderStatus(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Usuário não autenticado",
        });
      }

      const { status } = req.body;

      const orderId = req.params.orderId as string;

      const order = await clientUsecase.changeOrderStatus(
        orderId,
        status,
        req.user.userId,
      );

      return res.status(200).json({
        success: true,
        order,
      });
    } catch (error: any) {
      console.log("Erro ao buscar pedidos do usuário:", error);
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao buscar pedidos do usuário, tente novamente",
      });
    }
  }

  static async getItemsBuyed(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Usuário não autenticado",
        });
      }

      const items = await clientUsecase.getItemsBuyed(req.user.userId);

      return res.status(200).json({
        success: true,
        items,
      });
    } catch (error: any) {
      console.log("Erro ao buscar itens comprados:", error);
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao buscar itens comprados, tente novamente",
      });
    }
  }
}
