import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // VERY important -> now everytime you do user.find() you need to explicitly ask for password, by default it wont be included/returned
    },

    role: {
      type: String,
      enum: ["provider", "seeker"],
      required: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: false,
      },
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Geospatial index (CORE for MealMatch)
userSchema.index({ location: "2dsphere" });

export const User = mongoose.model("User", userSchema);
