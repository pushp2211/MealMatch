import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

import {
  createPickupRequest,
  acceptPickupRequest,
  declinePickupRequest,
  cancelPickupRequest,
  getProviderPickupRequests,
  completePickupRequest,
  getSeekerPickupRequests,
  getProviderMapRequests
} from "../controllers/index.js";

const router = express.Router();

router.post("/", protect, createPickupRequest);

router.get("/provider", protect, getProviderPickupRequests);
router.post("/:id/complete", protect, completePickupRequest);

router.post("/:id/accept", protect, acceptPickupRequest);
router.post("/:id/decline", protect, declinePickupRequest);

router.get("/seeker", protect, getSeekerPickupRequests);
router.post("/:id/cancel", protect, cancelPickupRequest);

router.get("/provider/map", protect, getProviderMapRequests);

export default router;
