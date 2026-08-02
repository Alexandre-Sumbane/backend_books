import { BusinessException } from "@/Exceptions/BusinessExceptions";
import { ZodException } from "@/Exceptions/ZodException";
import { MakeCategoryUsecase } from "@/domain/usecases/factories/make-category-usecase";
import { CreateCategorySchema } from "@/http/validation/category-schemas";

import { Request, Response } from "express";

export async function CreateCategory(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const categorySchema = CreateCategorySchema.parse(req.body);

    const categoryUsecase = MakeCategoryUsecase();

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
      errors: error.issues.map(issue => ({
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
