import { Router } from "express";

import models from "../models";
import { CategoryService } from "../service/Category/category.service";
import { CategoryController } from "../controllers/category.controller";

export class CategoryRoutes {
  private router: Router;


  constructor() {
    this.router = Router();

    this.createRoutes();
  }


  private createRoutes() {
    const categoryService = new CategoryService(models);
    const categoryController = new CategoryController(categoryService);

    this.router.post("/", categoryController.create.bind(categoryController));
    this.router.get("/", categoryController.getAll.bind(categoryController));
    this.router.get("/:id", categoryController.getById.bind(categoryController));
    this.router.patch("/:id", categoryController.update.bind(categoryController));
    this.router.delete("/:id", categoryController.delete.bind(categoryController));
  }

  public getRouter() {
    return this.router;
  }
}