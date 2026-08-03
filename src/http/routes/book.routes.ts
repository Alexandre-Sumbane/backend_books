import { Router } from "express";

import { EbookController } from "../controllers/ebook-controller";

import multer from "multer";
import multerConfig from "../../infra/config/multer-config";

const upload = multer(multerConfig);

const router = Router();

router.post(
  "/",
  upload.fields([
    { name: "cover", maxCount: 5 },
    { name: "file", maxCount: 1 },
  ]),
  EbookController.create,
);
router.get("/", EbookController.findAll);
router.get("/:ebookId", EbookController.findById);
router.put("/:ebookId", EbookController.update);
router.delete("/:ebookId", EbookController.delete);


export default router;