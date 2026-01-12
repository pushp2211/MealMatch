import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getSeekerRequests,
  cancelPickupRequest,
} from "@/api/pickupRequest.api";

export const useSeekerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingIds, setCancellingIds] = useState(new Set());

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await getSeekerRequests();
      setRequests(data.requests || []);
    } catch {
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const pendingRequests = requests.filter(r => r.status === "pending");
  const acceptedRequests = requests.filter(r => r.status === "accepted");

  const cancelRequest = async (id) => {
    if (cancellingIds.has(id)) return; // extra safety

    // mark as cancelling
    setCancellingIds(prev => new Set(prev).add(id));

    // optimistic remove from UI
    const prevRequests = requests;
    setRequests(prev => prev.filter(r => r._id !== id));

    try {
      await cancelPickupRequest(id);
      toast.success("Request cancelled");
    } catch (err) {
      // rollback
      setRequests(prevRequests);
      toast.error(
        err?.response?.data?.message || "Failed to cancel request"
      );
    } finally {
      setCancellingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  return {
    loading,
    pendingRequests,
    acceptedRequests,
    cancelRequest,
    cancellingIds,
  };
};
