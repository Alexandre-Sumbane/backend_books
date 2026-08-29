import { Router } from "express";

const router = Router();

import { ClientController } from "../controllers/client-controller";
import { AuthMiddleware } from "@/infra/middleware/AuthMiddleware";



router.get("/orders", AuthMiddleware.authenticate, ClientController.getUserOrders);
router.get("/items-buyed", AuthMiddleware.authenticate, ClientController.getItemsBuyed);
router.patch("/order/:orderId", AuthMiddleware.authenticate, ClientController.changeOrderStatus);

export default router;