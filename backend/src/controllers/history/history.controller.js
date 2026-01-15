import mongoose from "mongoose";
import { PickupRequest } from "../../models/pickup-request.model.js";
export const getHistoryAndImpact = async (req, res) => {
  const { id: userId, role } = req.user;

  const matchStage =
    role === "provider"
      ? { provider: new mongoose.Types.ObjectId(userId) }
      : { seeker: new mongoose.Types.ObjectId(userId) };

  const completedMatch = {
    $match: {
      ...matchStage,
      status: "completed",
    },
  };

  // -------- HISTORY ITEMS (LAST 30) --------
  const itemsPipeline = [
    completedMatch,
    { $sort: { completedAt: -1 } },
    { $limit: 30 },
    {
      $lookup: {
        from: "foodposts",
        localField: "foodPost",
        foreignField: "_id",
        as: "foodPost",
      },
    },
    { $unwind: "$foodPost" },
    {
      $lookup: {
        from: "users",
        localField: role === "provider" ? "seeker" : "provider",
        foreignField: "_id",
        as: "counterpart",
      },
    },
    { $unwind: "$counterpart" },
    {
      $project: {
        id: "$_id",
        title: "$foodTitleSnapshot",
        quantity: "$quantityRequested",
        unit: "$foodPost.quantity.unit",
        people: "$quantityRequested",
        counterpartName: "$counterpart.name",
        completedAt: 1,
      },
    },
  ];

  const items = await PickupRequest.aggregate(itemsPipeline);

  // -------- LIFETIME STATS --------
  const statsPipeline = [
    completedMatch,
    {
      $group: {
        _id: null,
        totalDonations: { $sum: 1 },
        totalFood: { $sum: "$quantityRequested" },
        totalPeople: { $sum: "$quantityRequested" },
        activeDays: {
          $addToSet: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$completedAt",
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalDonations: 1,
        totalFood: 1,
        totalPeople: 1,
        activeDays: { $size: "$activeDays" },
      },
    },
  ];

  const [stats = {}] = await PickupRequest.aggregate(statsPipeline);

  // -------- THIS MONTH IMPACT --------
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  const monthPipeline = [
    completedMatch,
    { $match: { completedAt: { $gte: startOfMonth } } },
    {
      $group: {
        _id: null,
        foodSaved: { $sum: "$quantityRequested" },
        peopleFed: { $sum: "$quantityRequested" },
      },
    },
    {
      $project: {
        _id: 0,
        foodSaved: 1,
        peopleFed: 1,
        estimatedValue: { $multiply: ["$foodSaved", 50] },
      },
    },
  ];

  const [thisMonth = {}] = await PickupRequest.aggregate(monthPipeline);

  res.json({
    items,
    stats: {
      totalDonations: stats.totalDonations || 0,
      totalFood: stats.totalFood || 0,
      totalPeople: stats.totalPeople || 0,
      activeDays: stats.activeDays || 0,
    },
    thisMonth: {
      foodSaved: thisMonth.foodSaved || 0,
      peopleFed: thisMonth.peopleFed || 0,
      estimatedValue: thisMonth.estimatedValue || 0,
    },
  });
};

