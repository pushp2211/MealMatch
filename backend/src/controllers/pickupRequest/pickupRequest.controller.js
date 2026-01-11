import mongoose from "mongoose";
import { FoodPost } from "../../models/food-post.model.js";
import { PickupRequest } from "../../models/pickup-request.model.js";

/* ---------------- CREATE PICKUP REQUEST (SEEKER) ---------------- */
export const createPickupRequest = async (req, res) => {
  try {
    if (req.user.role !== "seeker") {
      return res.status(403).json({ message: "Only seekers can request pickup" });
    }

    const { foodPostId, quantityRequested, note } = req.body;

    if (!mongoose.Types.ObjectId.isValid(foodPostId)) {
      return res.status(400).json({ message: "Invalid food post" });
    }

    if (!quantityRequested || quantityRequested < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const foodPost = await FoodPost.findById(foodPostId).populate(
      "provider",
      "settings"
    );

    if (!foodPost || foodPost.status !== "active") {
      return res.status(400).json({ message: "Food post not available" });
    }

    // Prevent self-request
    if (String(foodPost.provider._id) === req.user.id) {
      return res
        .status(400)
        .json({ message: "Cannot request your own food post" });
    }

    // Respect provider auto-expiry
    const autoExpire =
      foodPost.provider?.settings?.providerPreferences?.autoExpireFoodPosts;

    if (autoExpire && foodPost.availability.bestBefore < new Date()) {
      return res.status(400).json({ message: "Food post has expired" });
    }

    const remaining =
      foodPost.quantity.amount - foodPost.reservedQuantity;

    if (remaining <= 0) {
      return res
        .status(400)
        .json({ message: "Food quantity is no longer available" });
    }

    if (quantityRequested > remaining) {
      return res
        .status(400)
        .json({ message: "Requested quantity exceeds availability" });
    }

    // AUTO-ACCEPT SUPPORT
    let status = "pending";
    let acceptedAt = null;

    const autoAccept =
      foodPost.provider?.settings?.providerPreferences?.autoAcceptRequests;

    /* -------- ATOMIC AUTO-ACCEPT (ONLY WHEN ENABLED) -------- */
    if (autoAccept) {
      const updatedFoodPost = await FoodPost.findOneAndUpdate(
        {
          _id: foodPost._id,
          status: "active",
          $expr: {
            $gte: [
              { $subtract: ["$quantity.amount", "$reservedQuantity"] },
              quantityRequested,
            ],
          },
        },
        {
          $inc: { reservedQuantity: quantityRequested },
        },
        { new: true }
      );

      if (updatedFoodPost) {
        status = "accepted";
        acceptedAt = new Date();

        if (
          updatedFoodPost.reservedQuantity ===
          updatedFoodPost.quantity.amount
        ) {
          updatedFoodPost.status = "reserved";
          await updatedFoodPost.save();
        }
      }
      // else → race lost → remain pending
    }

    const pickupRequest = await PickupRequest.create({
      foodPost: foodPost._id,
      provider: foodPost.provider._id,
      seeker: req.user.id,
      quantityRequested,
      note,
      status,
      acceptedAt,
      foodTitleSnapshot: foodPost.title,
      foodTypeSnapshot: foodPost.foodType,
    });

    res.status(201).json({
      message:
        status === "accepted"
          ? "Pickup request auto-accepted"
          : "Pickup request sent",
      pickupRequest,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "You already have a pending request for this food post",
      });
    }

    console.error("Create pickup request error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------- GET PROVIDER PICKUP REQUESTS ---------------- */
export const getProviderPickupRequests = async (req, res) => {
  try {
    if (req.user.role !== "provider") {
      return res.status(403).json({ message: "Only providers allowed" });
    }

    const requests = await PickupRequest.find({
      provider: req.user.id,
      status: { $in: ["pending", "accepted"] },
    })
      .populate("seeker", "name phone isVerified seekerType")
      .populate("foodPost", "title quantity.unit")
      .sort({ createdAt: -1 });

    res.json({ requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch pickup requests" });
  }
};

/* ---------------- COMPLETE PICKUP (PROVIDER) ---------------- */
export const completePickupRequest = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const request = await PickupRequest.findOne({
      _id: req.params.id,
      provider: req.user.id,
      status: "accepted",
    }).session(session);

    if (!request) {
      throw new Error("Invalid pickup request");
    }

    request.status = "completed";
    request.completedAt = new Date();
    await request.save({ session });

    const foodPost = await FoodPost.findById(request.foodPost).session(session);

    if (
      foodPost.reservedQuantity === foodPost.quantity.amount &&
      foodPost.status !== "completed"
    ) {
      foodPost.status = "completed";
      await foodPost.save({ session });
    }

    await session.commitTransaction();
    res.json({ message: "Pickup completed" });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
};


/* ---------------- ACCEPT REQUEST (PROVIDER) ---------------- */
export const acceptPickupRequest = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const request = await PickupRequest.findOne({
      _id: req.params.id,
      provider: req.user.id,
      status: "pending",
    }).session(session);

    if (!request) {
      throw new Error("Invalid or already processed request");
    }

    const updatedFoodPost = await FoodPost.findOneAndUpdate(
      {
        _id: request.foodPost,
        status: "active",
        $expr: {
          $gte: [
            { $subtract: ["$quantity.amount", "$reservedQuantity"] },
            request.quantityRequested,
          ],
        },
      },
      {
        $inc: { reservedQuantity: request.quantityRequested },
      },
      { new: true, session }
    );

    if (!updatedFoodPost) {
      throw new Error("Insufficient quantity");
    }

    request.status = "accepted";
    request.acceptedAt = new Date();
    await request.save({ session });

    if (
      updatedFoodPost.reservedQuantity ===
      updatedFoodPost.quantity.amount
    ) {
      updatedFoodPost.status = "reserved";
      await updatedFoodPost.save({ session });
    }

    await session.commitTransaction();
    res.json({ message: "Pickup request accepted" });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
};


/* ---------------- DECLINE REQUEST ---------------- */
export const declinePickupRequest = async (req, res) => {
  const result = await PickupRequest.updateOne(
    {
      _id: req.params.id,
      provider: req.user.id,
      status: "pending",
    },
    {
      status: "declined",
    }
  );

  if (result.matchedCount === 0) {
    return res.status(400).json({
      message: "Invalid or already processed request",
    });
  }

  res.json({ message: "Request declined" });
};


/* ---------------- CANCEL REQUEST (SEEKER) ---------------- */
export const cancelPickupRequest = async (req, res) => {
  const request = await PickupRequest.findById(req.params.id);
  if (!request || request.status !== "pending") {
    return res.status(400).json({ message: "Cannot cancel request" });
  }

  if (String(request.seeker) !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  request.status = "cancelled";
  request.cancelledAt = new Date();
  await request.save();

  res.json({ message: "Request cancelled" });
};
