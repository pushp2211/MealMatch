import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import {
  createFoodPost,
  getMyFoodPosts,
  getNearbyFoodPosts,
} from "../controllers/index.js";

const router = express.Router();

// Provider
router.post("/post-food", protect, upload.array("media", 6), createFoodPost);
router.get("/get-my-posts", protect, getMyFoodPosts);

// Seeker
router.get("/nearby-providers", protect, getNearbyFoodPosts);

export default router;
