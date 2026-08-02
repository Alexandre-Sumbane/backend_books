import { MakeCategoryUsecase } from "@/domain/usecases/factories/make-category-usecase";

import { Request, Response } from "express";

import { BusinessException } from "../../../Exceptions/BusinessExceptions";

export async function UpdateCategory(
  req: Request,
  res: Response,
): Promise<Response> {
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
