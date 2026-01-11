import api from "@/utils/axios";

export const sendPickupRequest = async ({
  foodPostId,
  quantityRequested,
  note,
  userLocation,
}) => {
  const res = await api.post("/api/pickup-requests", {
    foodPostId,
    quantityRequested,
    note,
    userLocation,
  });

  return res.data;
};

export const fetchProviderPickupRequests = () =>
  api.get("/api/pickup-requests/provider");

export const acceptPickupRequest = (id) =>
  api.post(`/api/pickup-requests/${id}/accept`);

export const declinePickupRequest = (id) =>
  api.post(`/api/pickup-requests/${id}/decline`);

export const completePickupRequest = (id) =>
  api.post(`/api/pickup-requests/${id}/complete`);
