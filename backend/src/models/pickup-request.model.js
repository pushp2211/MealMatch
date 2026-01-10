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

    quantityRequested: {
      type: Number,
      required: true,
      min: 1,
    },

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

    // Snapshots (important for history UI)
    foodTitleSnapshot: String,
    foodTypeSnapshot: String,

    distanceKm: Number,
    etaMinutes: Number,

    acceptedAt: Date,
    completedAt: Date,
    cancelledAt: Date,
    expiredAt: Date,
  },
  { timestamps: true }
);

/**
 * Prevent same seeker from creating multiple pending requests
 * for the same food post.
 */
pickupRequestSchema.index(
  { foodPost: 1, seeker: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "pending" },
  }
);

export const PickupRequest = mongoose.model(
  "PickupRequest",
  pickupRequestSchema
);
