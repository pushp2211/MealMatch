
import mongoose from "mongoose";
import { Food } from "../models/food.model.js";

// Create food
export const createFood = async (req, res) => {
  const {
    title,
    description,
    foodType,
    numServings,
    quantity,
    pickupLocation,
    pickupTime,
    pickupInstructions,
    contactEmail,
    contactMobileNumber,
  } = req.body;

  if (
    !title ||
    !description ||
    !foodType ||
    !numServings ||
    !quantity ||
    !pickupLocation ||
    !pickupTime ||
    !contactEmail ||
    !contactMobileNumber
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All required fields must be filled." });
  }

  if (!["vegetarian", "non-vegetarian"].includes(foodType)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid food type." });
  }

  if (!/^\S+@\S+\.\S+$/.test(contactEmail)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid contact email format." });
  }

  if (!/^\d{10}$/.test(contactMobileNumber)) {
    return res.status(400).json({
      success: false,
      message: "Mobile number must be 10 digits.",
    });
  }

  const servingsNum = Number(numServings);
  if (Number.isNaN(servingsNum) || servingsNum <= 0) {
    return res.status(400).json({
      success: false,
      message: "Number of servings must be a positive number.",
    });
  }

  const pickupDate = new Date(pickupTime);
  if (isNaN(pickupDate.getTime())) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid pickup time." });
  }

  //Pending for now file handlinggg usingg cloudinary and multer....
  let menuimageurl = "";

  try {
    const food = await Food.create({
      title,
      description,
      foodType,
      numServings: servingsNum,
      quantity,
      menuimageurl,
      pickupLocation,
      pickupTime: pickupDate,
      pickupInstructions,
      contactEmail,
      contactMobileNumber,
      postedBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Food post created successfully.",
      data: food,
    });
  } catch (err) {
    console.error("Error creating food:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to create food post.",
      error: err.message,
    });
  }
};

// Get all foods
export const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find()
      .populate("postedBy", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: foods,
    });
  } catch (err) {
    console.error("Error fetching foods:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch foods.",
      error: err.message,
    });
  }
};

// Get Food by ID
export const getFoodById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid food ID." });
  }

  try {
    const food = await Food.findById(id).populate(
      "postedBy",
      "name email role"
    );

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found." });
    }

    return res.status(200).json({
      success: true,
      data: food,
    });
  } catch (err) {
    console.error("Error fetching food:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch food.",
      error: err.message,
    });
  }
};

// Get Foods for logged-in user
export const getMyFoods = async (req, res) => {
  try {
    const foods = await Food.find({ postedBy: req.user.id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: foods,
    });
  } catch (err) {
    console.error("Error fetching provider foods:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch your food posts.",
      error: err.message,
    });
  }
};

// Update Food
export const updateFood = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid food ID." });
  }
  try {
    const food = await Food.findById(id);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found." });
    }

    // Only the user who created the post can update it
    if (food.postedBy.toString() !== String(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: "You can update only your own food posts.",
      });
    }

    const fields = [
      "title",
      "description",
      "foodType",
      "numServings",
      "quantity",
      "pickupLocation",
      "pickupTime",
      "pickupInstructions",
      "contactEmail",
      "contactMobileNumber",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (field === "pickupTime") {
          const d = new Date(req.body[field]);
          if (!isNaN(d.getTime())) {
            food.pickupTime = d;
          }
        } else if (field === "numServings") {
          const n = Number(req.body[field]);
          if (!Number.isNaN(n) && n > 0) {
            food.numServings = n;
          }
        } else {
          food[field] = req.body[field];
        }
      }
    });

    // File handling for menuimageurl will addhere later

    const updated = await food.save();

    return res.status(200).json({
      success: true,
      message: "Food post updated successfully.",
      data: updated,
    });
  } catch (err) {
    console.error("Error updating food:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update food.",
      error: err.message,
    });
  }
};

// Delete Food
export const deleteFood = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid food ID." });
  }

  try {
    const food = await Food.findById(id);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found." });
    }

    if (food.postedBy.toString() !== String(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: "You can delete only your own food posts.",
      });
    }

    await food.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Food post deleted successfully.",
    });
  } catch (err) {
    console.error("Error deleting food:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete food.",
      error: err.message,
    });
  }
};
