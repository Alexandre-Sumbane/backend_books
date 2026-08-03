import express from "express";
import morgan from "morgan";
import BookRoutes from "../http/routes/book.routes";
import { swaggerSpec } from "../../swagger";
import swaggerUi from "swagger-ui-express";
import CategoryRoutes from "@/http/routes/category.routes";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/categories", CategoryRoutes);
app.use("/books", BookRoutes);

app.use(
  "/uploads",
  express.static(
    path.resolve(__dirname, "..", "infra", "uploads")
  )
);
    

// app.use("/img/cover", staticfolderImages);
// app.use("/pdfs", staticfolderPDFs);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
