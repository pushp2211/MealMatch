import { FoodPost } from "../models/foodPost.model.js";
import { User } from "../models/user.model.js";
import { cleanupFoodPostMedia } from "../controllers/food.controller.js";

const MEDIA_GRACE_PERIOD_MS = 24 * 60 * 60 * 1000; // 24h

export const runFoodExpiryJob = async () => {
  const now = new Date();

  /* -------- EXPIRE POSTS -------- */
  const posts = await FoodPost.find({
    status: "active",
    "availability.bestBefore": { $lt: now },
  });

  for (const post of posts) {
    const provider = await User.findById(post.provider).lean();

    if (!provider?.settings?.providerPreferences?.autoExpireFoodPosts) {
      continue;
    }

    post.status = "expired";
    post.expiredAt = now;
    await post.save();
  }

  /* -------- CLEAN MEDIA (AFTER GRACE) -------- */
  const cleanupCandidates = await FoodPost.find({
    status: "expired",
    expiredAt: { $lt: new Date(now - MEDIA_GRACE_PERIOD_MS) },
    mediaCleanedAt: { $exists: false },
  });

  for (const post of cleanupCandidates) {
    await cleanupFoodPostMedia(post);
  }
};
