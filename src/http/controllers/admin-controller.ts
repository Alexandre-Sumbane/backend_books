import { Request, Response } from "express";

import { MakeAdminUsecase } from "@/domain/usecases/factories/make-admin-usecase";

import { BusinessException } from "@/Exceptions/BusinessExceptions";
import { MakeOrderUsecase } from "@/domain/usecases/factories/make-order-usecase";

const adminUsecase = MakeAdminUsecase();
const orderUsecase = MakeOrderUsecase();

export class AdminController {
  static async getOrderById(req: Request, res: Response): Promise<Response> {
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
          message: "Usuário nao autorizado a pegar pedido",
        });
      }

      const orderId = req.params.orderId as string;

      const orders = await orderUsecase.getOrderById(orderId);

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

      const orders = await adminUsecase.getAllOrders();

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

  static async getAllClientConfirmations(
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

      if (req.user.userType !== "admin") {
        return res.status(403).json({
          success: false,
          message:
            "Usuário nao autorizado a listar todas confirmations de clients",
        });
      }

      const confirmations = await adminUsecase.getClientConfirmations();

      return res.status(200).json({
        success: true,
        confirmations,
      });
    } catch (error: any) {
      console.log("Erro ao buscar confirmations de clients:", error);
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message:
          "Ocorreu erro ao buscar confirmations de clients, tente novamente",
      });
    }
  }
  static async changeWithdrawalStatus(
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

      if (req.user.userType !== "admin") {
        return res.status(403).json({
          success: false,
          message:
            "Usuário nao autorizado a actualizar o status de pedido de saque!",
        });
      }

      const { status, reason } = req.body;

      const earnings = await adminUsecase.changestatusWithdrwalRequest({
        withdrawalId: req.params.withdrawalId as string,
        status,
        reason,
      });

      return res.status(200).json({
        success: true,
        message: "Status do pedido alterado com sucesso!",
        earnings,
      });
    } catch (error: any) {
      console.log(error);

      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          sucess: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao alterar status do pedido, tente novamente!",
      });
    }
  }
}
