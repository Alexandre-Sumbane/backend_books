import { Router } from "express";

import { CategoryController } from "../controllers/category-controller";

const router = Router();

router.post("/", CategoryController.create);
router.get("/", CategoryController.findAll);
router.get("/:categoryId", CategoryController.findById);
router.put("/:categoryId", CategoryController.update);
router.delete("/:categoryId", CategoryController.delete);


export default router;
