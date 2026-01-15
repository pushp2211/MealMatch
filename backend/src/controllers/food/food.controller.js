import cloudinary from "../../config/cloudinary.js";
import { FoodPost } from "../../models/food-post.model.js";
import { User } from "../../models/user.model.js";

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

    await User.findByIdAndUpdate(req.user.id, {
      location: {
        type: "Point",
        coordinates: location.coordinates, // [lng, lat]
      },
    });

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
    
    const longitude = Number(lng);
    const latitude = Number(lat);
    const maxDist = Number(radius);

    if (isNaN(longitude) || isNaN(latitude)) {
      return res.status(400).json({ message: "Invalid coordinates" });
    }

    if (!longitude || !latitude) {
      return res.status(400).json({ message: "Location required" });
    }

    const now = new Date();

    // Step 1: Geo + active posts
    const posts = await FoodPost.find({
      status: "active",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: maxDist,
        },
      },
    })
      .populate(
        "provider",
        "name organizationName isVerified location settings"
      )
      .lean();

    // Step 2: Business rule filtering
    const filtered = posts.filter((post) => {
      // Quantity check
      const remainingQty =
        post.quantity.amount - post.reservedQuantity;
      if (remainingQty <= 0) return false;

      // Provider auto-expiry preference
      const autoExpire =
        post.provider?.settings?.providerPreferences?.autoExpireFoodPosts;
    
      if (autoExpire && post.availability.bestBefore < now) {
        return false;
      }

      return true;
    });

    // Step 3: Shape response EXACTLY for frontend
    const response = filtered.map((post) => ({
      id: post._id,
      title: post.title,
      description: post.description,
      foodType: post.foodType,
      freshness: post.freshness,

      quantity: {
        amount: post.quantity.amount - post.reservedQuantity,
        unit: post.quantity.unit,
      },

      pricing: post.pricing,
      availability: post.availability,

      provider: {
        id: post.provider._id,
        name: post.provider.name,
        organizationName: post.provider.organizationName,
        verified: post.provider.isVerified,
        location: {
          // Fallback logic in case provider location isn't perfectly synced yet, 
          // though createFoodPost ensures it is.
          lat: post.provider.location?.coordinates?.[1] || post.location.coordinates[1],
          lng: post.provider.location?.coordinates?.[0] || post.location.coordinates[0],
        },
      },

      location: {
        lat: post.location.coordinates[1],
        lng: post.location.coordinates[0],
        address: post.location.address,
      },

      media: post.media,
      createdAt: post.createdAt,
    }));
    console.log("response", response);

    res.json({ posts: response });
  } catch (error) {
    console.error("Find food error:", error);
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