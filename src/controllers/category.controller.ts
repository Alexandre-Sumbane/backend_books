import { BusinessException } from "../Exceptions/BusinessExceptions";
import { CategoryService } from "../service/Category/category.service";
import { Request, Response } from "express";

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const category = await this.categoryService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Categoria criada com sucesso",
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
        message: "Ocorreu erro ao criar categoria, tente novamente",
      });
    }
  }
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const categories = await this.categoryService.findAll();

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

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const categoryId = req.params.id as string;

      const category = await this.categoryService.findById(categoryId);

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

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const categoryId = req.params.id as string;

      const category = await this.categoryService.update(categoryId, req.body);

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

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const categoryId = req.params.id as string;

      const category = await this.categoryService.delete(categoryId);

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
