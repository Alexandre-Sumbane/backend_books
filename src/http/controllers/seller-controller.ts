import { ChangeWithdrawalRequestDto } from "@/domain/Dto/with-drawal.dto";
import { userIsAssociado } from "@/domain/usecases/auth/auth-usecases";
import { MakeSellerUsecase } from "@/domain/usecases/factories/make-seller-usecase";
import { BusinessException } from "@/Exceptions/BusinessExceptions";
import { Request, Response } from "express";

const sellerUsecase = MakeSellerUsecase();
export class SellerController {
  static async getEarnings(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Usuário não autenticado",
        });
      }

      const user = await userIsAssociado(req.user.userId, req.user.token);

      if (!user) {
        return res.status(403).json({
          success: false,
          message: "Não autorizado a criar Books",
        });
      }

      const earnings = await sellerUsecase.getTotalEarnings(req.user.userId);

      return res.status(200).json({
        success: true,
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
        message: "Ocorreu erro ao pegar ganhos, tente novamente!",
      });
    }
  }

  static async changeStatusWithdrawal(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Usuário não autenticado",
        });
      }

      const user = await userIsAssociado(req.user.userId, req.user.token);

      if (!user) {
        return res.status(403).json({
          success: false,
          message: "Não autorizado a criar Books",
        });
      }

      const { status, reason } = req.body;

      const withdrawalId = req.params.withdrawalId as string;

      const earnings = await sellerUsecase.changestatusWithdrwalRequest({
        withdrawalId,
        userId: req.user.userId,
        status,
        reason
    });

      return res.status(200).json({
        success: true,
        message: "Status de saque actualizado com sucesso!",
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
        message: "Ocorreu erro ao actualizar status de saque, tente novamente!",
      });
    }
  }
}
