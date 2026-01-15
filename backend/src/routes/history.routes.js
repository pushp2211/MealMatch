import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getHistoryAndImpact } from "../controllers/index.js";

const router = express.Router();

router.get("/", protect, getHistoryAndImpact);

export default router;
