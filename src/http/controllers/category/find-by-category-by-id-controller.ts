import { BusinessException } from "@/Exceptions/BusinessExceptions";
import { MakeCategoryUsecase } from "@/domain/usecases/factories/make-category-usecase";

import { Request, Response } from "express";

export async function GetCategoryById(
  req: Request,
  res: Response,
): Promise<Response> {
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
