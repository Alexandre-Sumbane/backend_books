import { BusinessException } from "@/Exceptions/BusinessExceptions";
import { ZodException } from "@/Exceptions/ZodException";
import { userIsAssociado } from "@/domain/usecases/auth/auth-usecases";

import { MakeEBookUsecase } from "@/domain/usecases/factories/make-book-usecase";

import { Request, Response } from "express";
import { ZodError } from "zod";
import { CreateEbookSchema } from "../validation/ebook-schemas";

const ebookUsecase = MakeEBookUsecase();

export class EbookController {
  static async create(req: Request, res: Response): Promise<Response> {
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
      const result = CreateEbookSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: "Verifique os dados preenchidos.",
          errors: result.error.issues.map((error) => ({
            field: error.path.join("."),
            message:
              error.code === "invalid_type"
                ? "Este campo é obrigatório."
                : error.message,
          })),
        });
      }

      const ebook = await ebookUsecase.create(req.body, req);

      return res.status(201).json({
        success: true,
        message: "Book criado com sucesso!",
        ebook,
      });
    } catch (error: any) {
      console.log(error);

      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          sucess: false,
          message: error.message,
        });
      }

      if (error instanceof ZodError || error instanceof ZodException) {
        return res.status(400).json({
          success: false,
          message: "Erro de validação",
          errors: error.issues.map((issue: { message: string }) => ({
            message: issue.message,
          })),
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao criar Book, tente novamente!",
      });
    }
  }
  static async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const ebooks = await ebookUsecase.findAll();

      return res.status(200).json({
        success: true,
        ebooks,
      });
    } catch (error: any) {
      console.log(error.message);

      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          sucess: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao listar Books, tente novamente!",
      });
    }
  }

  static async findById(req: Request, res: Response): Promise<Response> {
    const { ebookId } = req.params as { ebookId: string };
    try {
      const ebook = await ebookUsecase.findById(ebookId);

      return res.status(200).json({
        success: true,
        ebook,
      });
    } catch (error: any) {
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          sucess: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao pegar Book, tente novamente!",
      });
    }
  }

  static async findByCategoryId(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { categoryId } = req.params as { categoryId: string };
    try {
      const ebooks = await ebookUsecase.findByCategoryId(categoryId);

      return res.status(200).json({
        success: true,
        ebooks,
      });
    } catch (error: any) {
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          sucess: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao listar Books por categoria, tente novamente!",
      });
    }
  }

  static async findBySeller(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Usuário não autenticado",
        });
      }

      const ebooks = await ebookUsecase.findBySeller(req.user.userId);

      return res.status(200).json({
        success: true,
        ebooks,
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
        message: "Ocorreu erro ao listar Books por vendedor, tente novamente!",
      });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
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
        message: "Não autorizado a actualizar Books",
      });
    }

    const { ebookId } = req.params as { ebookId: string };
    try {
      const ebook = await ebookUsecase.update(ebookId, req.body);

      return res.status(200).json({
        success: true,
        message: "Dados do Book actualizados com sucesso!",
        ebook,
      });
    } catch (error: any) {
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          sucess: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message:
          "Ocorreu erro ao actualizar os dados do Book, tente novamente!",
      });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const { ebookId } = req.params as { ebookId: string };
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
          message: "Não autorizado a eliminar Books",
        });
      }

      const ebookUsecase = MakeEBookUsecase();

      const ebook = await ebookUsecase.delete(ebookId);

      return res.status(200).json({
        success: true,
        message: "Book deletado com sucesso!",
        ebook,
      });
    } catch (error: any) {
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          sucess: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao deletar Book, tente novamente!",
      });
    }
  }
}
