import { Router } from "express";

import { CartController } from "../controllers/cart-controller";

import { AuthMiddleware } from "@/infra/middleware/AuthMiddleware";


const router = Router();


router.post("/add",  AuthMiddleware.authenticate, CartController.addToCart);
router.get("/:cartId", AuthMiddleware.authenticate, CartController.getCart);




export default router;