import mongoose from "mongoose";

const pickupRequestSchema = new mongoose.Schema(
  {
    foodPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodPost",
      required: true,
      index: true,
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    seeker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    quantityRequested: Number,

    note: String,

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "declined",
        "cancelled",
        "completed",
        "expired",
      ],
      default: "pending",
      index: true,
    },

    distanceKm: Number,
    etaMinutes: Number,

    acceptedAt: Date,
    completedAt: Date,
  },
  { timestamps: true }
);

export const PickupRequest = mongoose.model("PickupRequest", pickupRequestSchema);
