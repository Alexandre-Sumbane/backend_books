import { Router } from "express";

import { SellerController } from "../controllers/seller-controller";
import { AuthMiddleware } from "@/infra/middleware/AuthMiddleware";

const router = Router();


router.post("/withdrawal-request", AuthMiddleware.authenticate, SellerController.createWithdrawal);
router.get("/books", AuthMiddleware.authenticate, SellerController.getSellerBooks);
router.get("/earnings", AuthMiddleware.authenticate, SellerController.getEarnings);
router.get("/situation", AuthMiddleware.authenticate, SellerController.getSellerSituation);
router.put("/withdrawal/:withdrawalId", AuthMiddleware.authenticate, SellerController.changeStatusWithdrawal);



export default router;