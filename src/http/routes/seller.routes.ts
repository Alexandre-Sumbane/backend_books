import { Router } from "express";

import { SellerController } from "../controllers/seller-controller";
import { AuthMiddleware } from "@/infra/middleware/AuthMiddleware";

const router = Router();


router.get("/books", AuthMiddleware.authenticate, SellerController.getSellerBooks);
router.get("/earnings", AuthMiddleware.authenticate, SellerController.getEarnings);
router.put("/withdrawal/:withdrawalId", AuthMiddleware.authenticate, SellerController.changeStatusWithdrawal);



export default router;