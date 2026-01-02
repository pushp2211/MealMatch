import cloudinary from "../../config/cloudinary.js";
import { FoodPost } from "../../models/food-post.model.js";

// used by provider to create food post
export const createFoodPost = async (req, res) => {
  try {
    if (req.user.role !== "provider") {
      return res.status(403).json({ message: "Only providers can post food" });
    }

    const {
      title,
      description,
      foodType,
      quantity,
      freshness,
      pricing,
      availability,
      location,
    } = req.body;

    if (!location?.coordinates || location.coordinates.length !== 2) {
      return res.status(400).json({ message: "Invalid location" });
    }

    const media = [];

    if (req.files?.length) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          {
            folder: `mealMatch/food-posts/provider_${req.user.id}`,
            resource_type: file.mimetype.startsWith("video")
              ? "video"
              : "image",
            tags: [
              "mealMatch",
              "foodPost",
              `provider:${req.user.id}`,
            ],
          }
        );

        media.push({
          url: result.secure_url,
          publicId: result.public_id,
          type: file.mimetype.startsWith("video") ? "video" : "image",
        });
      }
    }

    const foodPost = await FoodPost.create({
      provider: req.user.id,
      title,
      description,
      foodType,
      quantity,
      freshness,
      pricing,
      availability,
      location,
      media,
    });

    res.status(201).json({
      message: "Food post created successfully",
      foodPost,
    });
  } catch (error) {
    console.error("Create food post error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// used in activity/history section of provider to show records
export const getMyFoodPosts = async (req, res) => {
  try {
    const posts = await FoodPost.find({ provider: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// used by seeker to get nearby foodPosts
export const getNearbyFoodPosts = async (req, res) => {
  try {
    const { lng, lat, radius = 5000 } = req.query;

    if (!lng || !lat) {
      return res.status(400).json({ message: "Location required" });
    }

    const posts = await FoodPost.find({
      status: "active",
      "availability.bestBefore": { $gt: new Date() },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number(lng), Number(lat)],
          },
          $maxDistance: Number(radius),
        },
      },
    })
      .populate("provider", "name organizationName isVerified")
      .lean();

    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// media cleanup (used by expiry/cancel)
export const cleanupFoodPostMedia = async (foodPost) => {
  if (!foodPost.media?.length) return;

  for (const m of foodPost.media) {
    await cloudinary.uploader.destroy(m.publicId, {
      resource_type: m.type === "video" ? "video" : "image",
    });
  }

  foodPost.media = [];
  foodPost.mediaCleanedAt = new Date();
  await foodPost.save();
};

// food post expiry with grace period related logic is present in /src/jobs/foodExpiry