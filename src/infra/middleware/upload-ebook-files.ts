import { NextFunction, Request, Response } from "express";
import multer from "multer";

import multerConfig from "../config/multer-config";

const upload = multer(multerConfig).fields([
  { name: "cover", maxCount: 5 },
  { name: "file", maxCount: 1 },
]);

const multerMessages: Partial<Record<multer.ErrorCode, (field?: string) => string>> = {
  LIMIT_UNEXPECTED_FILE: (field) =>
    `Campo de ficheiro inválido ou excedido: '${field}'. Use 'cover' (até 5 imagens) e 'file' (1 PDF).`,
  LIMIT_FILE_SIZE: (field) => `O ficheiro '${field}' excede o tamanho permitido.`,
  LIMIT_FILE_COUNT: () => "Número de ficheiros excedido.",
};

export function uploadEbookFiles(req: Request, res: Response, next: NextFunction) {
  upload(req, res, (err: unknown) => {
    if (!err) {
      return next();
    }

    if (err instanceof multer.MulterError) {
      const message = multerMessages[err.code]?.(err.field) ?? err.message;

      return res.status(400).json({
        success: false,
        message,
      });
    }

    if (err instanceof Error) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    return next(err);
  });
}
