import { BusinessException } from "@/Exceptions/BusinessExceptions";
import { ZodException } from "@/Exceptions/ZodException";
import { userIsAssociado } from "@/domain/usecases/auth/auth-usecases";
import { MakeCategoryUsecase } from "@/domain/usecases/factories/make-category-usecase";
import { CreateCategorySchema } from "@/http/validation/category-schemas";

import { Request, Response } from "express";

const categoryUsecase = MakeCategoryUsecase();

export class CategoryController {
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      if(!req.user){
        return res.status(401).json({
          success: false,
          message: "Usuário não autenticado",
        });
      }

      const user = await userIsAssociado(req.user.userId, req.user.token);

      if (!user) {
        return res.status(403).json({
          success: false,
          message: "Não autorizado a criar categorias",
        });
      }

      const categorySchema = CreateCategorySchema.parse(req.body);

      const category = await categoryUsecase.create(categorySchema);

      return res.status(201).json({
        success: true,
        message: "Categoria criada com sucesso",
        category,
      });
    } catch (error) {
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      if (error instanceof ZodException) {
        return res.status(400).json({
          success: false,
          message: "Erro de validação",
          errors: error.issues.map((issue) => ({
            message: issue.message,
          })),
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao criar categoria, tente novamente",
      });
    }
  }

  static async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const categoryUsecase = MakeCategoryUsecase();

      const categories = await categoryUsecase.findAll();

      return res.status(200).json({
        success: true,
        categories,
      });
    } catch (error: any) {
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao buscar as categorias, tente novamente",
      });
    }
  }

  static async findById(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.params as { categoryId: string };

    try {
      const categoryUsecase = MakeCategoryUsecase();

      const category = await categoryUsecase.findById(categoryId);

      return res.status(200).json({
        success: true,
        category,
      });
    } catch (error: any) {
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao buscar a categoria, tente novamente",
      });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const categoryUsecase = MakeCategoryUsecase();

      const { categoryId } = req.params as { categoryId: string };

      const category = await categoryUsecase.update(categoryId, req.body);

      return res.status(200).json({
        success: true,
        message: "Categoria atualizada com sucesso",
        category,
      });
    } catch (error: any) {
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao atualizar a categoria, tente novamente",
      });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const categoryUsecase = MakeCategoryUsecase();

      const categoryId = req.params.id as string;

      const category = await categoryUsecase.delete(categoryId);

      return res.status(200).json({
        success: true,
        message: "Categoria deletada com sucesso",
        category,
      });
    } catch (error: any) {
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao deletar a categoria, tente novamente",
      });
    }
  }
}
