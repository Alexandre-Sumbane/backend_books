import { ChangeWithdrawalRequestDto } from "@/domain/Dto/with-drawal.dto";
import { userIsAssociado } from "@/domain/usecases/auth/auth-usecases";
import { MakeSellerUsecase } from "@/domain/usecases/factories/make-seller-usecase";
import { BusinessException } from "@/Exceptions/BusinessExceptions";
import { Request, Response } from "express";

const sellerUsecase = MakeSellerUsecase();
export class SellerController {

  static async createWithdrawal(req: Request, res: Response): Promise<Response> {
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

      const withdrawal = await sellerUsecase.createWithdrawalRequest(
        {
          sellerId: req.user.userId,
          walletId: req.body.walletId,
          amount: req.body.amount,
        }
      );

      return res.status(201).json({
        success: true,
        withdrawal,
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
        message: "Ocorreu erro ao criar saque, tente novamente!",
      });
    }
  }
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

  static async getSellerBooks(req: Request, res: Response): Promise<Response> {
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

      const books = await sellerUsecase.getSellerBooks(req.user.userId);

      return res.status(200).json({
        success: true,
        books,
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
        message: "Ocorreu erro ao pegar livros, tente novamente!",
      });
    }
  }

  static async getSellerSituation(req: Request, res: Response): Promise<Response> {
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

      const situation = await sellerUsecase.getSellerSituation(req.user.userId);

      return res.status(200).json({
        success: true,
        situation,
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
        message: "Ocorreu erro ao pegar situação, tente novamente!",
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
