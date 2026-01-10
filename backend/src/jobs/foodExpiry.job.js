import { User } from "../models/user.model.js";
import { cleanupFoodPostMedia } from "../controllers/index.js";
import { PickupRequest } from "../models/pickup-request.model.js";
import { FoodPost } from "../models/food-post.model.js";

const MEDIA_GRACE_PERIOD_MS = 24 * 60 * 60 * 1000; // 24h

export const runFoodExpiryJob = async () => {
  console.log("Cron Job: Running Food Expiry Check...");
  const now = new Date();

  /* -------- EXPIRE POSTS -------- */
  const posts = await FoodPost.find({
    status: "active",
    "availability.bestBefore": { $lt: now },
  });
  console.log(`Found ${posts.length} candidates for expiry.`);

  for (const post of posts) {
    try {
      const provider = await User.findById(post.provider).lean();

      if (!provider?.settings?.providerPreferences?.autoExpireFoodPosts) {
        continue;
      }

      // Expire food post
      post.status = "expired";
      post.expiredAt = now;
      await post.save();

      // Expire ALL pending pickup requests for this post
      await PickupRequest.updateMany(
        {
          foodPost: post._id,
          status: "pending",
        },
        {
          status: "expired",
          expiredAt: now,
        }
      );
      console.log(`Expired post: ${post.title} (${post._id})`);
    } catch (innerError) {
      console.error(`Failed to expire post ${post._id}:`, innerError);
      // Continue to next post even if one fails
    }
  }

  /* -------- CLEAN MEDIA (AFTER GRACE) -------- */
  const cleanupCandidates = await FoodPost.find({
    status: "expired",
    expiredAt: { $lt: new Date(now - MEDIA_GRACE_PERIOD_MS) },
    mediaCleanedAt: { $exists: false },
  });

  for (const post of cleanupCandidates) {
    try {
      await cleanupFoodPostMedia(post);
      console.log(`Cleaned media for: ${post.title}`);
    } catch (mediaError) {
      console.error(`Failed to clean media for ${post._id}:`, mediaError);
    }
  }
};
