import { BusinessException } from "@/Exceptions/BusinessExceptions";

import { MakeEBookUsecase } from "@/domain/usecases/factories/make-book-usecase";

import { Request, Response } from "express";

 export async function CreateEbook(req: Request, res: Response): Promise<Response> {
    try {

      const ebookUsecase = MakeEBookUsecase();

      const ebook = await ebookUsecase.create(req.body);

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

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao criar Book, tente novamente!",
      });
    }
  }


