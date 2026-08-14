import express from "express";
import morgan from "morgan";

import CategoryRoutes from "@/http/routes/category.routes";
import BookRoutes from "../http/routes/book.routes";
import LocationRoutes from "@/http/routes/location.routes";
import CartRoutes from "@/http/routes/cart.routes";
import OrderRoutes from "@/http/routes/order.routes";

import { swaggerSpec } from "../../swagger";
import swaggerUi from "swagger-ui-express";

import path from "path";

const app = express();
const uploadsRoot = path.resolve(process.cwd(), "src", "infra", "infra", "uploads");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/categories", CategoryRoutes);
app.use("/books", BookRoutes);
app.use("/locations", LocationRoutes);
app.use("/carts", CartRoutes);
app.use("/orders", OrderRoutes);

app.use("/uploads", express.static(uploadsRoot));
    

// app.use("/img/cover", staticfolderImages);
// app.use("/pdfs", staticfolderPDFs);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
