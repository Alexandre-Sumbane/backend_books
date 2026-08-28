import { Router } from "express";

const router = Router();

import { ClientController } from "../controllers/client-controller";
import { AuthMiddleware } from "@/infra/middleware/AuthMiddleware";



router.get("/orders", AuthMiddleware.authenticate, ClientController.getUserOrders);
router.patch("/order/:orderId", AuthMiddleware.authenticate, ClientController.changeOrderStatus);

export default router;