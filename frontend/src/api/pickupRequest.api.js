import api from "@/utils/axios";

// Seeker related apis 
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

export const getSeekerRequests = async () => {
  const res = await api.get("/api/pickup-requests/seeker");
  return res.data;
};

export const cancelPickupRequest = async (id) => {
  const res = await api.post(`/api/pickup-requests/${id}/cancel`);
  return res.data;
};


// Provider related apis
export const fetchProviderPickupRequests = () =>
  api.get("/api/pickup-requests/provider");

export const acceptPickupRequest = (id) =>
  api.post(`/api/pickup-requests/${id}/accept`);

export const declinePickupRequest = (id) =>
  api.post(`/api/pickup-requests/${id}/decline`);

export const completePickupRequest = (id, data) =>
  api.post(`/api/pickup-requests/${id}/complete`, data);

