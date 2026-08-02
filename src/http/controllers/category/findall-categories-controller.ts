import { BusinessException } from "@/Exceptions/BusinessExceptions";
import { MakeCategoryUsecase } from "@/domain/usecases/factories/make-category-usecase";

import { Request, Response } from "express";

export async function GetAllCategories(
  req: Request,
  res: Response,
): Promise<Response> {
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
