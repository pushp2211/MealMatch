import mongoose from "mongoose";

/**
 * Each entry represents ONE logged-in device/session
 */
const sessionSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["provider", "seeker"],
      required: true,
    },

    deviceId: String,
    userAgent: String,
    ip: String,

    refreshTokenExpiresAt: {
      type: Date,
      required: true,
    },

    sessionExpiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

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

    avatar: {
      type: String,
    },

    bio: {
      type: String,
      maxlength: 300,
      trim: true,
    },

    providerType: {
      type: String,
      enum: ["restaurant", "mess", "individual", "event"],
    },

    seekerType: {
      type: String,
      enum: ["individual", "ngo", "shelter"],
    },

    organizationName: {
      type: String,
      trim: true,
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
    sessions: [sessionSchema],

    // for settings preferences related 
    settings: {
      notifications: {
        email: { type: Boolean, default: false },
        push: { type: Boolean, default: true },
      },

      privacy: {
        phoneVisibility: {
          type: String,
          enum: ["after_match", "always", "never"],
          default: "after_match",
        },
        profileVisibility: {
          type: String,
          enum: ["everyone", "verified_only"],
          default: "everyone",
        },
      },

      providerPreferences: {
        pickupRadiusKm: { type: Number, default: 10 },
        autoAcceptRequests: { type: Boolean, default: false },
        autoExpireFoodPosts: { type: Boolean, default: true },
      },

      seekerPreferences: {
        searchRadiusKm: { type: Number, default: 10 },
      },
    },
  },
  {
    timestamps: true,
  }
);

// Geospatial index (CORE for MealMatch)
userSchema.index({ location: "2dsphere" });

export const User = mongoose.model("User", userSchema);
