import { Request, Response } from "express";
import { AuthorService } from "../service/Author/author.service";
import { BusinessException } from "../Exceptions/BusinessExceptions";

export class AuthorController {
  constructor(private authorService: AuthorService) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const author = await this.authorService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Author criado com sucesso!",
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
        message: "Ocorreu erro ao criar Author, tente novamente!",
      });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const authors = await this.authorService.findAll();

      return res.status(200).json({
        success: true,
        authors,
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
        message: "Ocorreu erro ao listar Authors, tente novamente!",
      });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const author = await this.authorService.findById(req.params.id as string);

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
        message: "Ocorreu erro ao pegar Author, tente novamente!",
      });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const author = await this.authorService.update(req.params.id as string, req.body);

      return res.status(200).json({
        success: true,
        message: "Dados do Author actualizados com sucesso!",
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
        message: "Ocorreu erro ao actualizar os dados do Author, tente novamente!",
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const author = await this.authorService.delete(req.params.id as string);

      return res.status(200).json({
        success: true,
        message: "Author deletado com sucesso!",
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
        message: "Ocorreu erro ao deletar Author, tente novamente!",
      });
    }
  }

}
