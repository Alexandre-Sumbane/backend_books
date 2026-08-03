import { Request } from 'express';
import fs from "fs";
import multer, { FileFilterCallback } from 'multer';
import { resolve, extname } from 'path';

const nr_aleatorio = (): number => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
    const allowedImageTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/webp',
        'image/gif',
        'image/bmp',
        'image/svg+xml',
        'image/tiff'
      ];
    const allowedPdfTypes = ['application/pdf'];

    if (![...allowedImageTypes, ...allowedPdfTypes].includes(file.mimetype)) {
      return cb(
        new multer.MulterError(
          'LIMIT_UNEXPECTED_FILE',
          'Apenas ficheiros PNG, JPG ou PDF são permitidos.'
        )
      );
    }

    cb(null, true);
  },

  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let folder = 'others';

      if (file.mimetype.startsWith('image/')) {
        folder = 'img/Covers';
      } else if (file.mimetype === 'application/pdf') {
        folder = 'pdfs';
      }

      const uploadPath = resolve(
      __dirname,
      "..",
      "infra",
      "uploads",
      folder
    );

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  
  },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}_${nr_aleatorio()}${extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
};