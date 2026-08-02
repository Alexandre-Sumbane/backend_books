import express, { Express} from "express";
import morgan from "morgan";
import { BookRoutes } from "../http/routes/book.routes";
import { swaggerSpec } from "../../swagger";
import swaggerUi from 'swagger-ui-express';
import CategoryRoutes  from "@/http/routes/category.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(morgan("dev"));

app.use('/categories', CategoryRoutes);
app.use('/books', BookRoutes);

export default app;