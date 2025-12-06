import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    foodType: {
      type: String,
      enum: ["vegetarian", "non-vegetarian"],
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    contactMobileNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Mobile number must be 10 digits"],
    },
    numServings: { type: Number, required: true, min: 1 },
    quantity: { type: String, required: true },
    menuimageurl: { type: String },
    pickupLocation: { type: String, required: true },
    pickupTime: { type: Date, required: true },
    pickupInstructions: { type: String },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
export const Food = mongoose.model("Food", foodSchema);
