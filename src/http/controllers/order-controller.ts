import { MakeOrderUsecase } from "@/domain/usecases/factories/make-order-usecase";
import { BusinessException } from "@/Exceptions/BusinessExceptions";

import { Request, Response } from "express";

const orderUsecase = MakeOrderUsecase();

export class OrderController {
  static async create(req: Request, res: Response): Promise<Response> {
    const { cartId, delivery } = req.body;

    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Usuário não autenticado",
        });
      }

      const order = await orderUsecase.create({
        delivery,
        cartId,
        userId: req.user.userId,
      });

      return res.status(200).json({
        success: true,
        message: "Order criado com sucesso!",
        order,
      });
    } catch (error: any) {
      console.log("Erro ao criar order:", error);
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao criar order, tente novamente",
      });
    }
  }

  static async getOrderById(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Usuário não autenticado",
        });
      }

      const orderId = req.params.orderId as string;

      const order = await orderUsecase.getOrderById(orderId, req.user.userId);

      return res.status(200).json({
        success: true,
        order,
      });
    } catch (error: any) {
      console.log("Erro ao buscar pedido:", error);
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao buscar pedido, tente novamente",
      });
    }
  }

  static async getAllOrders(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Usuário não autenticado",
        });
      }

      if (req.user.userType !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Usuário nao autorizado a listar todos os pedidos",
        });
      }

      const orders = await orderUsecase.getAllOrders();

      return res.status(200).json({
        success: true,
        orders,
      });
    } catch (error: any) {
      console.log("Erro ao buscar pedidos:", error);
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao buscar pedidos, tente novamente",
      });
    }
  }
}
