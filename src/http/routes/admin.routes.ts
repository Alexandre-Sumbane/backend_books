import { Router } from "express";

const router = Router();

import { AdminController } from "../controllers/admin-controller";
import { AuthMiddleware } from "@/infra/middleware/AuthMiddleware";

router.put("/withdrawal/:withdrawalId", AuthMiddleware.authenticate, AdminController.changeWithdrawalStatus);


export default router;