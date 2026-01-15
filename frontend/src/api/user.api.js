import api from "@/utils/axios";

export const getMyProfile = () =>
  api.get("/api/users/me").then(res => res.data);

export const updateMyProfile = async (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // Check if the value is a File
    if (value instanceof File) {
      // Force the field name to "avatar" regardless of what key the state uses
      formData.append("avatar", value); 
    } 
    else if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  });

  return api.patch("/api/users/me/profile", formData)
    .then(res => res.data);
};

export const updateMySettings = settings =>
  api.patch("/api/users/me/settings", { settings }).then(res => res.data);

export const getMySessions = () =>
  api.get("/api/users/me/sessions").then(res => res.data);

export const logoutMe = () =>
  api.post("/api/auth/logout");

export const logoutAll = () =>
  api.post("/api/auth/logout-all");

export const changePassword = data =>
  api.post("/api/users/me/change-password", data);

export const deleteAccount = password =>
  api.post("/api/users/me/delete", { password });
