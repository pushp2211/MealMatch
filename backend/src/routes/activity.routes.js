import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getActivityFeed } from "../controllers/index.js";

const router = express.Router();

router.get("/", protect, getActivityFeed);

export default router;
