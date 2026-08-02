import { BusinessException } from "@/Exceptions/BusinessExceptions";
import { MakeCategoryUsecase } from "@/domain/usecases/factories/make-category-usecase";

import { Request, Response } from "express";

export async function DeleteCategory(
  req: Request,
  res: Response,
): Promise<Response> {
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
