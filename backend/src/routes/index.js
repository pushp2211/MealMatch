import { Router } from "express";
const router = Router();

import authRoutes from "./auth.route.js"
import foodRoutes from "./food.route.js"

router.use("/auth", authRoutes);
router.use("/foods", foodRoutes);

export default router;
