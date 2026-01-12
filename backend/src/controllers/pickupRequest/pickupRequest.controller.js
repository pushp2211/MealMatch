import mongoose from "mongoose";
import { FoodPost } from "../../models/food-post.model.js";
import { PickupRequest } from "../../models/pickup-request.model.js";
import { User } from "../../models/user.model.js";

// --- Helper: Calculate Distance (Haversine Formula) ---
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Returns distance in km
};

/* ---------------- CREATE PICKUP REQUEST (SEEKER) ---------------- */
export const createPickupRequest = async (req, res) => {
  try {
    if (req.user.role !== "seeker") {
      return res.status(403).json({ message: "Only seekers can request pickup" });
    }

    const { foodPostId, quantityRequested, note, userLocation } = req.body;

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

    // ----------------------- Calculate Distance & ETA (Hybrid) ----------------
    let distanceKm = 0;
    let etaMinutes = 0;
    
    let seekerLat, seekerLng;
    // 1. Try Frontend Location First (Most Accurate context)
    if (userLocation?.lat && userLocation?.lng) {
      seekerLat = parseFloat(userLocation.lat);
      seekerLng = parseFloat(userLocation.lng);
    } 
    // 2. Fallback to Database Location (Profile Address)
    else {
      const seeker = await User.findById(req.user.id).select("location");
      if (seeker?.location?.coordinates?.length === 2) {
        // Mongo stores as [lng, lat]
        seekerLng = seeker.location.coordinates[0];
        seekerLat = seeker.location.coordinates[1];
      }
    }

    // 3. Calculate if we have valid coordinates
    if (seekerLat && seekerLng && foodPost.location?.coordinates?.length === 2) {
      const [providerLng, providerLat] = foodPost.location.coordinates;

      const rawDist = calculateDistance(
        seekerLat,
        seekerLng,
        providerLat,
        providerLng
      );
      
      distanceKm = parseFloat(rawDist.toFixed(1)); 
      etaMinutes = Math.ceil(distanceKm * 3 + 5); 
    }
    // ----------------------------------------------------------------------------

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
      distanceKm,
      etaMinutes,
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

/* ---------------- GET SEEKER PICKUP REQUESTS ---------------- */
export const getSeekerPickupRequests = async (req, res) => {
  try {
    if (req.user.role !== "seeker") {
      return res.status(403).json({ message: "Only seekers allowed" });
    }

    const requests = await PickupRequest.find({
      seeker: req.user.id,
      status: { $in: ["pending", "accepted"] },
    })
      .populate("provider", "name phone isVerified")
      .populate("foodPost", "title quantity.unit availability.bestBefore")
      .sort({ createdAt: -1 });

    res.json({ requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch seeker requests" });
  }
};

/* ---------------- CANCEL REQUEST (SEEKER) ---------------- */
export const cancelPickupRequest = async (req, res) => {
  if (req.user.role !== "seeker") {
    return res.status(403).json({ message: "Only seekers allowed" });
  }

  const result = await PickupRequest.findOneAndUpdate(
    {
      _id: req.params.id,
      seeker: req.user.id,
      status: "pending",
    },
    {
      status: "cancelled",
      cancelledAt: new Date(),
    }
  );

  if (!result) {
    return res.status(400).json({
      message: "Invalid or already processed request",
    });
  }
  res.json({ message: "Request cancelled" });
};
