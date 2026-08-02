import { MakeEBookUsecase } from "@/domain/usecases/factories/make-book-usecase";

import { Request, Response } from "express";

import { BusinessException } from "@/Exceptions/BusinessExceptions";

export async function DeleteEbook(req: Request, res: Response): Promise<Response> {

    const { ebookId } = req.params as { ebookId: string };
    try {
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