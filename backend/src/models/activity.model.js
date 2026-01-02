import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    role: {
      type: String,
      enum: ["provider", "seeker"],
    },

    type: {
      type: String,
      enum: [
        "food_posted",
        "request_sent",
        "request_received",
        "request_accepted",
        "request_declined",
        "pickup_completed",
        "food_expired",
        "profile_verified",
      ],
    },

    title: String,
    description: String,

    relatedFoodPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodPost",
    },

    relatedPickupRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PickupRequest",
    },
  },
  { timestamps: true }
);

export const Activity = mongoose.model("Activity", activitySchema);
