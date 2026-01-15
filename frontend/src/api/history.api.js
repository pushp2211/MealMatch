import api from "@/utils/axios";

export const fetchHistory = async () => {
  const { data } = await api.get("/api/history");
  return data;
};
