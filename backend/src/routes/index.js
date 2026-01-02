import { Router } from "express";
const router = Router();

import authRoutes from "./auth.route.js"
import foodRoutes from "./food.routes.js"

router.use("/auth", authRoutes);
router.use("/food", foodRoutes);

export default router;
