import { useEffect, useRef, useState } from "react";
import axios from "axios";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const useSeekerETA = ({ from, to, enabled }) => {
  const [etaMinutes, setEtaMinutes] = useState(null);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!enabled || !from || !to) return;

    // Debounce ETA calculation
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${from.lng},${from.lat};${to.lng},${to.lat}`,
          {
            params: {
              access_token: MAPBOX_TOKEN,
              overview: "false",
            },
          }
        );

        const seconds = res.data?.routes?.[0]?.duration;
        if (seconds) {
          setEtaMinutes(Math.ceil(seconds / 60));
        } else {
          setEtaMinutes(null);
        }
      } catch (err) {
        console.error("ETA fetch failed", err);
        setEtaMinutes(null);
      } finally {
        setLoading(false);
      }
    }, 400); // ✅ debounce delay

    return () => clearTimeout(debounceRef.current);
  }, [from, to, enabled]);

  return { etaMinutes, loading };
};

export default useSeekerETA;
