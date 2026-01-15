import { Router } from "express";
const router = Router();

import authRoutes from "./auth.route.js"
import foodRoutes from "./food.routes.js"
import pickupRoutes from "./pickupRequest.routes.js"
import activityRoutes from "./activity.routes.js"
import historyRoutes from "./history.routes.js"

router.use("/auth", authRoutes);
router.use("/food", foodRoutes);
router.use("/pickup-requests", pickupRoutes);
router.use("/activity", activityRoutes);
router.use("/history", historyRoutes)

export default router;
