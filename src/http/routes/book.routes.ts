import { Router } from "express";

import { EbookController } from "../controllers/ebook-controller";

import multer from "multer";
import multerConfig from "../../infra/config/multer-config";

const upload = multer(multerConfig);

const router = Router();

import { AuthMiddleware } from "../../infra/middleware/AuthMiddleware";

router.post(
  "/", AuthMiddleware.authenticate,
  upload.fields([
    { name: "cover", maxCount: 5 },
    { name: "file", maxCount: 1 },
  ]),
  EbookController.create,
);
router.get("/", EbookController.findAll);
router.get("/category/:categoryId", EbookController.findByCategoryId);
router.get("/:ebookId", EbookController.findById);
router.put("/:ebookId", AuthMiddleware.authenticate, EbookController.update);
router.delete("/:ebookId", AuthMiddleware.authenticate, EbookController.delete);


export default router;