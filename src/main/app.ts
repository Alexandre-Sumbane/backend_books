import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import swaggerUi from "swagger-ui-express";

import CategoryRoutes from "@/http/routes/category.routes";
import BookRoutes from "@/http/routes/book.routes";
import LocationRoutes from "@/http/routes/location.routes";
import CartRoutes from "@/http/routes/cart.routes";
import OrderRoutes from "@/http/routes/order.routes";
import PaymentRoutes from "@/http/routes/payment.routes";
import SellerRoutes from "@/http/routes/seller.routes";
import AdminRoutes from "@/http/routes/admin.routes";
import ClientRoutes from "@/http/routes/client.routes";

import { swaggerSpec } from "../../swagger";

const app = express();

const uploadsRoot = path.resolve(
  process.cwd(),
  "src",
  "infra",
  "infra",
  "uploads"
);

const allowedOrigins = [
  "*",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
  "http://localhost:3004",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/categories", CategoryRoutes);
app.use("/books", BookRoutes);
app.use("/locations", LocationRoutes);
app.use("/carts", CartRoutes);
app.use("/orders", OrderRoutes);
app.use("/payments", PaymentRoutes);
app.use("/seller", SellerRoutes);
app.use("/admin", AdminRoutes);
app.use("/client", ClientRoutes);

app.use("/uploads", express.static(uploadsRoot));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

export default app;