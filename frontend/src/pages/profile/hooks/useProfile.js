import { getMyProfile, updateMyProfile } from "@/api/user.api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProfile()
      .then(setProfile)
      .finally(() => setLoading(false));
  }, []);

  const saveProfile = async data => {
    const updated = await updateMyProfile(data);
    setProfile(updated);
    toast.success("Profile updated");
  };

  return { profile, setProfile, saveProfile, loading };
};
