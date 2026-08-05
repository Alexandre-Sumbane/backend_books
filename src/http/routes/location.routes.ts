import { Router } from "express";
import { LocationController } from "../controllers/location-controller";
import { AuthMiddleware } from "@/infra/middleware/AuthMiddleware";

const router = Router();

router.post("/", AuthMiddleware.authenticate, LocationController.create);
router.get("/", LocationController.findAll);
router.get("/:locationId", LocationController.findById);
router.put("/:locationId", AuthMiddleware.authenticate, LocationController.update);
router.delete("/:locationId", AuthMiddleware.authenticate, LocationController.delete);

export default router;
