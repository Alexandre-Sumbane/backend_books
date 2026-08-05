import { BusinessException } from "@/Exceptions/BusinessExceptions";
import { ZodException } from "@/Exceptions/ZodException";
import { CreateLocationSchema } from "@/http/validation/location-schemas";

import { Request, Response } from "express";
import { MakeLocationUsecase } from "@/domain/usecases/factories/make-location-usecase";

const locationUsecase = MakeLocationUsecase();

export class LocationController {
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const locationSchema = CreateLocationSchema.parse(req.body);

      const location = await locationUsecase.create(locationSchema);

      return res.status(201).json({
        success: true,
        message: "Local criado com sucesso",
        location,
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
          errors: error.issues.map((issue) => ({
            message: issue.message,
          })),
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ocorreu erro ao criar local, tente novamente",
      });
    }
  }

  static async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const locations = await locationUsecase.findAll();

      return res.status(200).json({
        success: true,
        locations,
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
        message: "Ocorreu erro ao buscar os locais, tente novamente",
      });
    }
  }

  static async findById(req: Request, res: Response): Promise<Response> {
    const { locationId } = req.params as { locationId: string };

    try {
      const location = await locationUsecase.findById(locationId);

      return res.status(200).json({
        success: true,
        location,
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
        message: "Ocorreu erro ao buscar o local, tente novamente",
      });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { locationId } = req.params as { locationId: string };
      const locationData = req.body;

      const location = await locationUsecase.update(locationId, locationData);

      return res.status(200).json({
        success: true,
        message: "Local atualizado com sucesso",
        location,
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
        message: "Ocorreu erro ao atualizar o local, tente novamente",
      });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const locationId = req.params.locationId as string;

      await locationUsecase.delete(locationId);

      return res.status(200).json({
        success: true,
        message: "Local deletado com sucesso",
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
        message: "Ocorreu erro ao deletar o local, tente novamente",
      });
    }
  }
}
