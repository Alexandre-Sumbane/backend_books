import { Router } from "express";

const router = Router();

import { AdminController } from "../controllers/admin-controller";
import { AuthMiddleware } from "@/infra/middleware/AuthMiddleware";

router.get("/orders", AuthMiddleware.authenticate, AdminController.getAllOrders);
router.get("/order/:orderId", AuthMiddleware.authenticate, AdminController.getOrderById);
router.get("/client-confirmations", AuthMiddleware.authenticate, AdminController.getAllClientConfirmations);
router.put("/withdrawal/:withdrawalId", AuthMiddleware.authenticate, AdminController.changeWithdrawalStatus);


export default router;