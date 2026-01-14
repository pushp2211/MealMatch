import api from "@/utils/axios";
import { useEffect, useMemo, useState } from "react";
import { prepareActivityFeed } from "../utils/activityGrouping";

export const useActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchActivityFeed = async () => {
      try {
        const res = await api.get("/api/activity");
        if (mounted) {
          setActivities(res.data.activities || []);
        }
      } catch (err) {
        console.error("Failed to fetch activity feed", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchActivityFeed();

    return () => {
      mounted = false;
    };
  }, []);

  return useMemo(() => {
    if (loading) return {};
    return prepareActivityFeed(activities);
  }, [activities, loading]);
};
