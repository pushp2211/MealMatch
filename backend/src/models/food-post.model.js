import mongoose from "mongoose";

const foodPostSchema = new mongoose.Schema(
  {
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    foodType: {
      type: String,
      enum: ["veg", "non-veg", "mixed"],
      required: true,
    },

    quantity: {
      amount: {
        type: Number,
        required: true,
        min: 1,
      },
      unit: {
        type: String,
        enum: ["plates", "servings", "packets"],
        required: true,
      },
    },

    freshness: {
      type: String,
      enum: ["fresh", "good", "use-soon"],
      required: true,
    },

    pricing: {
      type: {
        type: String,
        enum: ["free", "minimal"],
        default: "free",
      },
      amount: {
        type: Number,
        default: 0,
      },
    },

    availability: {
      bestBefore: {
        type: Date,
        required: true,
      },
      availableFrom: Date,
      availableUntil: Date,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
      address: String,
    },

    media: [
      {
        url: String,
        publicId: String, // REQUIRED for cleanup
        type: {
          type: String,
          enum: ["image", "video"],
        },
      },
    ],

    status: {
      type: String,
      enum: ["active", "reserved", "completed", "expired", "cancelled"],
      default: "active",
      index: true,
    },

    reservedQuantity: {
      type: Number,
      default: 0,
    },

    // AUTO-EXPIRY SUPPORT
    expiredAt: Date,
    mediaCleanedAt: Date,
  },
  { timestamps: true }
);

foodPostSchema.index({ location: "2dsphere" });
foodPostSchema.index({ status: 1, "availability.bestBefore": 1 });

export const FoodPost = mongoose.model("FoodPost", foodPostSchema);
