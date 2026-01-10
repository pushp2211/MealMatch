import api from "@/utils/axios";

export const sendPickupRequest = async ({
  foodPostId,
  quantityRequested,
  note,
}) => {
  const res = await api.post("/api/pickup-requests", {
    foodPostId,
    quantityRequested,
    note,
  });

  return res.data;
};
