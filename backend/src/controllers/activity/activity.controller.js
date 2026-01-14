import { FoodPost } from "../../models/food-post.model.js";
import { PickupRequest } from "../../models/pickup-request.model.js";

export const getActivityFeed = async (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;

  let activities = [];

  if (role === "provider") {
    // ---------- FOOD POSTS ----------
    const foodPosts = await FoodPost.find({ provider: userId })
      .select("title status createdAt expiredAt updatedAt")
      .lean();

    foodPosts.forEach((post) => {
      // Food posted
      activities.push({
        id: `food_posted_${post._id}`,
        type: "food_posted",
        title: "Food posted successfully",
        description: `You posted "${post.title}"`,
        timestamp: post.createdAt,
      });

      // Food expired
      if (post.status === "expired" && post.expiredAt) {
        activities.push({
          id: `food_expired_${post._id}`,
          type: "food_expired",
          title: "Food post expired",
          description: `Your post "${post.title}" expired`,
          timestamp: post.expiredAt,
        });
      }
    });

    // ---------- PICKUP REQUESTS ----------
    const requests = await PickupRequest.find({ provider: userId })
      .populate("seeker", "name organizationName")
      .select(
        "status foodTitleSnapshot createdAt acceptedAt completedAt expiredAt declinedAt cancelledAt"
      )
      .lean();

    requests.forEach((req) => {
      const seekerName =
        req.seeker?.organizationName || req.seeker?.name || "Seeker";

      // New request
      activities.push({
        id: `request_received_${req._id}`,
        type: "request_received",
        title: "New pickup request",
        description: `${seekerName} requested "${req.foodTitleSnapshot}"`,
        timestamp: req.createdAt,
      });

      if (req.status === "accepted" && req.acceptedAt) {
        activities.push({
          id: `request_accepted_${req._id}`,
          type: "request_accepted",
          title: "Request accepted",
          description: `You accepted pickup request for "${req.foodTitleSnapshot}"`,
          timestamp: req.acceptedAt,
        });
      }

      if (req.status === "declined") {
        activities.push({
          id: `request_rejected_${req._id}`,
          type: "request_rejected",
          title: "Request declined",
          description: `You declined pickup request for "${req.foodTitleSnapshot}"`,
          timestamp: req.declinedAt,
        });
      }

      if (req.status === "completed" && req.completedAt) {
        activities.push({
          id: `pickup_completed_${req._id}`,
          type: "pickup_completed",
          title: "Pickup completed",
          description: `"${req.foodTitleSnapshot}" was successfully picked up`,
          timestamp: req.completedAt,
        });
      }
    });
  }

  // ---------------- SEEKER ----------------
  if (role === "seeker") {
    const requests = await PickupRequest.find({ seeker: userId })
      .populate("provider", "name organizationName")
      .select(
        "status foodTitleSnapshot createdAt acceptedAt completedAt expiredAt"
      )
      .lean();

    requests.forEach((req) => {
      const providerName =
        req.provider?.organizationName || req.provider?.name || "Provider";

      activities.push({
        id: `request_sent_${req._id}`,
        type: "request_sent",
        title: "Request sent",
        description: `You requested "${req.foodTitleSnapshot}" from ${providerName}`,
        timestamp: req.createdAt,
      });

      if (req.status === "accepted" && req.acceptedAt) {
        activities.push({
          id: `request_accepted_${req._id}`,
          type: "request_accepted",
          title: "Request accepted",
          description: `${providerName} accepted your request`,
          timestamp: req.acceptedAt,
        });
      }

      if (req.status === "declined") {
        activities.push({
          id: `request_rejected_${req._id}`,
          type: "request_rejected",
          title: "Request declined",
          description: `${providerName} declined your request`,
          timestamp: req.updatedAt,
        });
      }

      if (req.status === "completed" && req.completedAt) {
        activities.push({
          id: `pickup_completed_${req._id}`,
          type: "pickup_completed",
          title: "Pickup completed",
          description: `You picked up "${req.foodTitleSnapshot}"`,
          timestamp: req.completedAt,
        });
      }

      if (req.status === "expired" && req.expiredAt) {
        activities.push({
          id: `request_expired_${req._id}`,
          type: "request_expired",
          title: "Request expired",
          description: `Request for "${req.foodTitleSnapshot}" expired`,
          timestamp: req.expiredAt,
        });
      }
    });
  }

  // SORT DESCENDING
  activities.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  res.json({ activities });
};
