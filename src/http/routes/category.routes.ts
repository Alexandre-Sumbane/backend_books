import { Router } from "express";

import { CategoryController } from "../controllers/category-controller";
import { AuthMiddleware } from "@/infra/middleware/AuthMiddleware";

const router = Router();

router.post("/", AuthMiddleware.authenticate, CategoryController.create);
router.get("/", CategoryController.findAll);
router.get("/:categoryId", CategoryController.findById);
router.put("/:categoryId", AuthMiddleware.authenticate, CategoryController.update);
router.delete("/:categoryId", AuthMiddleware.authenticate, CategoryController.delete);


export default router;
