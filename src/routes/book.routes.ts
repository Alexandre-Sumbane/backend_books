import { Router } from "express";

import models from "../models";
import { BookService } from "../service/Book/book.service";
import { BookController } from "../controllers/book.controller";

export class BookRoutes {
    private router: Router

    constructor() {
        this.router = Router();

        this.createRoutes();
    }

    private createRoutes() {
        const bookService = new BookService(models);
        const bookController = new BookController(bookService);

        this.router.post("/", bookController.create.bind(bookController));
        this.router.get("/", bookController.getAll.bind(bookController));
        this.router.get("/:id", bookController.getById.bind(bookController));
        this.router.patch("/:id", bookController.update.bind(bookController));
        this.router.delete("/:id", bookController.delete.bind(bookController));

    }
    public getRouter() {
        return this.router;
    }
}