import { AuthMiddleware } from "@/infra/middleware/AuthMiddleware";
import { Router } from "express";
import { PaymentController } from "../controllers/payment-controller";

const router = Router();

router.post("/pay", AuthMiddleware.authenticate, PaymentController.createPayment);




export default router;