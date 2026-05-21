import { Request, Response } from "express";

import { BusinessException } from "../Exceptions/BusinessExceptions";
import { BookService } from "../service/Book/book.service";

export class BookController {
  constructor(private bookService: BookService) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const author = await this.bookService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Book criado com sucesso!",
        author,
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

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const authors = await this.bookService.findAll();

      return res.status(200).json({
        success: true,
        authors,
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

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const author = await this.bookService.findById(req.params.id as string);

      return res.status(200).json({
        success: false,
        author,
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
        message: "Ocorreu erro ao pegar Book, tente novamente!",
      });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const author = await this.bookService.update(req.params.id as string, req.body);

      return res.status(200).json({
        success: true,
        message: "Dados do Book actualizados com sucesso!",
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
        message: "Ocorreu erro ao actualizar os dados do Book, tente novamente!",
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const author = await this.bookService.delete(req.params.id as string);

      return res.status(200).json({
        success: true,
        message: "Book deletado com sucesso!",
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

}
