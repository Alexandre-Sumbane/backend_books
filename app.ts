import express, { Express} from "express";
import morgan from "morgan";
import { CategoryRoutes } from "./src/routes/category.routes";
import { AuthorRoutes } from "./src/routes/author.routes";
import { BookRoutes } from "./src/routes/book.routes";
import { swaggerSpec } from "./swagger";
import swaggerUi from 'swagger-ui-express';

class App {
  public app: Express;

  constructor() {
    this.app = express();

    this.middlewares();

    this.routes();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.use(morgan("dev"));
  }

  private routes() {
      const categoryRoutes = new CategoryRoutes();
      const authorRoutes = new AuthorRoutes();
      const bookRoutes = new BookRoutes();

      this.app.use('/categories', categoryRoutes.getRouter());
      this.app.use('/authors', authorRoutes.getRouter());
      this.app.use('/books', bookRoutes.getRouter());
  }
}

export default new App().app;