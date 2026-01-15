import { useEffect, useRef, useState } from "react";
import {
  getMyProfile,
  getMySessions,
  updateMySettings,
  logoutMe,
  logoutAll,
  changePassword,
  deleteAccount,
} from "@/api/user.api";
import { toast } from "sonner";

export const useSettings = () => {
  const [settings, setSettings] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const debounceRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        const profile = await getMyProfile();
        const sessions = await getMySessions();

        setSettings(profile.settings);
        setSessions(sessions);
      } catch {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const updateSettings = (nextSettings) => {
    setSettings(nextSettings);

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        await updateMySettings(nextSettings);
        toast.success("Settings saved");
      } catch {
        toast.error("Failed to save settings");
      }
    }, 500);
  };

  return {
    loading,
    settings,
    sessions,

    updateSettings,

    logoutCurrent: async () => {
      await logoutMe();
      window.location.reload();
    },

    logoutAllDevices: async () => {
      await logoutAll();
      window.location.reload();
    },

    changePassword,
    deleteAccount,
  };
};
