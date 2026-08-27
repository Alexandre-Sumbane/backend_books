import { Router } from "express";
import { OrderController } from "../controllers/order-controller";
import { AuthMiddleware } from "@/infra/middleware/AuthMiddleware";

const router = Router();


router.post("/",  AuthMiddleware.authenticate, OrderController.create);
router.get("/", AuthMiddleware.authenticate, OrderController.getAllOrders);
router.get("/user", AuthMiddleware.authenticate, OrderController.getUserOrders);
router.get("/:orderId", AuthMiddleware.authenticate, OrderController.getOrderById);




export default router;