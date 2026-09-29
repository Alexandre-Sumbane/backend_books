import { Router } from "express";

import { EbookController } from "../controllers/ebook-controller";

import { AuthMiddleware } from "../../infra/middleware/AuthMiddleware";
import { uploadEbookFiles } from "../../infra/middleware/upload-ebook-files";

const router = Router();

router.post("/", AuthMiddleware.authenticate, uploadEbookFiles, EbookController.create);
router.get("/", EbookController.findAll);
router.get("/category/:categoryId", EbookController.findByCategoryId);
router.get("/:ebookId", EbookController.findById);
router.put("/:ebookId", AuthMiddleware.authenticate, EbookController.update);
router.patch("/:ebookId/confirm", AuthMiddleware.authenticate, EbookController.confirm);
router.delete("/:ebookId", AuthMiddleware.authenticate, EbookController.delete);

export default router;
