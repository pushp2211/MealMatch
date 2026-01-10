import { Router } from "express";
const router = Router();

import authRoutes from "./auth.route.js"
import foodRoutes from "./food.routes.js"
import pickupRoutes from "./pickupRequest.routes.js"

router.use("/auth", authRoutes);
router.use("/food", foodRoutes);
router.use("/pickup-requests", pickupRoutes);

export default router;
