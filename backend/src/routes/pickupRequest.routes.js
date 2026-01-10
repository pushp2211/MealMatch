import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

import {
  createPickupRequest,
  acceptPickupRequest,
  declinePickupRequest,
  cancelPickupRequest,
} from "../controllers/index.js";

const router = express.Router();

router.post("/", protect, createPickupRequest);
router.post("/:id/accept", protect, acceptPickupRequest);
router.post("/:id/decline", protect, declinePickupRequest);
router.post("/:id/cancel", protect, cancelPickupRequest);

export default router;
