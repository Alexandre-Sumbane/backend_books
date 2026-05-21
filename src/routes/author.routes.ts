import { Router } from "express";

import models from "../models";
import { AuthorService } from "../service/Author/author.service";
import { AuthorController } from "../controllers/author.controller";


export class AuthorRoutes {
    private router: Router;

    constructor() { 
        this.router = Router();

        this.createRoutes();
    }

    private createRoutes() { 
        const authorService = new AuthorService(models);
        const authorController = new AuthorController(authorService);

        this.router.post("/", authorController.create.bind(authorController));
        this.router.get("/", authorController.getAll.bind(authorController));
        this.router.get("/:id", authorController.getById.bind(authorController));
        this.router.patch("/:id", authorController.update.bind(authorController));
        this.router.delete("/:id", authorController.delete.bind(authorController));

    }


    public getRouter() {
        return this.router;
    }
}