import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

import {
  fetchProviderPickupRequests,
  acceptPickupRequest,
  declinePickupRequest,
  completePickupRequest,
} from "@/api/pickupRequest.api";

import { filterRequests, countByStatus } from "../utils/requests.utils";

export const useProviderRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  /* ================= FETCH REQUESTS ================= */
  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchProviderPickupRequests();
      setRequests(res.data.requests || []);
    } catch (error) {
      console.error("Failed to fetch provider requests:", error);
      toast.error("Failed to load pickup requests.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  /* ================= DERIVED DATA ================= */
  const filteredRequests = filterRequests(requests, filter);
  const pendingCount = countByStatus(requests, "pending");
  const acceptedCount = countByStatus(requests, "accepted");

  /* ================= ACTION HANDLERS ================= */
  const handleAccept = async (id) => {
    // Optimistic UI: Update status immediately
    setRequests((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, status: "accepted" } : r
      )
    );

    try {
      await acceptPickupRequest(id);
      toast.success("Request accepted! Contact details unlocked.");
      fetchRequests(); // Sync with server timestamps
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to accept request"
      );
      fetchRequests(); // Rollback on error
    }
  };

  const handleReject = async (id) => {
    // Optimistic UI: Mark as rejected (will be hidden by filter)
    setRequests((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, status: "declined" } : r
      )
    );

    try {
      await declinePickupRequest(id);
      toast.info("Request declined.");
      fetchRequests();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to decline request"
      );
      fetchRequests();
    }
  };

  const handleComplete = async (id) => {
    // Optimistic UI
    setRequests((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, status: "completed" } : r
      )
    );

    try {
      await completePickupRequest(id);
      toast.success("Pickup completed! Thank you for your donation.");
      fetchRequests();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to complete pickup"
      );
      fetchRequests();
    }
  };

  return {
    loading,
    filter,
    setFilter,
    filteredRequests,
    pendingCount,
    acceptedCount,
    handleAccept,
    handleReject,
    handleComplete,
  };
};