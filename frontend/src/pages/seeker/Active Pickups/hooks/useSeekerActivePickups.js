import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { getSeekerRequests } from "@/api/pickupRequest.api";

// Adapter: Backend PickupRequest → mockSeekerRequests shape
const adaptPickup = (r) => ({
  id: r._id,
  status: r.status,
  acceptedAt: r.acceptedAt ? new Date(r.acceptedAt) : null,
  note: r.note,
  requestedQuantity: r.quantityRequested,
  eta: r.etaMinutes,
  providerPhone: r.provider?.phone,

  pickupCode: r.pickupCode, // OTP (extra, safe)

  food: {
    title: r.foodPost.title,
    quantityUnit: r.foodPost.quantity?.unit,
    availableTo: r.foodPost.availability?.bestBefore,

    location: {
      address: r.foodPost.location?.address || "Pickup location",
      coordinates: r.foodPost.location?.coordinates,
    },

    provider: {
      name: r.provider?.name || "Provider",
      verified: r.provider?.isVerified || false,
      rating: 5.0,          
      totalDonations: 0,    
      distance: r.distanceKm,
    },
  },
});

export const useSeekerActivePickups = () => {
  const [activePickups, setActivePickups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActivePickups = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getSeekerRequests();

      const adapted = data.requests
        .filter((r) => r.status === "accepted")
        .map(adaptPickup);

      setActivePickups(adapted);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load active pickups");
    } finally {
      setLoading(false);
    }
  }, []);

  // Keep function (UI depends on it)
  const markCompleted = (pickupCode) => {
    if(!pickupCode) toast.info("Share the OTP with provider to complete pickup");
    else  toast.info(`Share the OTP : ${pickupCode} with provider to complete pickup`);
  };

  const reportIssue = () => {
    toast.info("Issue reporting coming soon");
  };

  useEffect(() => {
    fetchActivePickups();
  }, [fetchActivePickups]);

  return {
    activePickups,
    loading,
    markCompleted,
    reportIssue,
    refresh: fetchActivePickups,
  };
};
