import { Request, Response } from "express";

import { MakeAdminUsecase } from "@/domain/usecases/factories/make-admin-usecase";

import { BusinessException } from "@/Exceptions/BusinessExceptions";

const adminUsecase = MakeAdminUsecase();

export class AdminController {
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

      const { withdrawalId, status, reason } = req.body;

      const earnings = await adminUsecase.changestatusWithdrwalRequest({
        withdrawalId,
        userId: req.user.userId,
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
