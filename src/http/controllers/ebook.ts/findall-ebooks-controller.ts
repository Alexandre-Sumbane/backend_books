import { BusinessException } from "@/Exceptions/BusinessExceptions";

import { MakeEBookUsecase } from "@/domain/usecases/factories/make-book-usecase";

import { Request, Response } from "express";

 export async function GetAllEbooks(req: Request, res: Response): Promise<Response> {
    try {

        const ebookUsecase = MakeEBookUsecase();

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