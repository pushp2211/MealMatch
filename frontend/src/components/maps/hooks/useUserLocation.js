import { useRef, useState } from "react";

const useUserLocation = () => {
  const watchIdRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const getPosition = (options) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  // Level 3 Fallback: IP-based Location
  const getIpLocation = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      if (!response.ok) throw new Error("IP API failed");
      const data = await response.json();
      return { lat: data.latitude, lng: data.longitude };
    } catch (error) {
      console.error("IP Location failed:", error);
      throw error;
    }
  };

  const getCurrentLocation = async (cb) => {
    setLoading(true);
    // 1. Level 1: High Accuracy GPS
    try {
      const pos = await getPosition({
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
      setLoading(false);
      cb({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      return;
    } catch (err) {
      console.warn("GPS failed, trying Low Accuracy...");
    }

    // 2. Level 2: Low Accuracy (Wi-Fi/Cell)
    try {
      const pos = await getPosition({
        enableHighAccuracy: false,
        timeout: 7000, // Reduced to 7s to reach fallback faster
        maximumAge: 0,
      });
      setLoading(false);
      cb({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      return;
    } catch (err) {
      console.warn("Low Accuracy failed, trying IP Fallback...");
    }

    // 3. Level 3: IP Geolocation (The "Last Resort")
    try {
      const ipPos = await getIpLocation();
      setLoading(false);
      cb(ipPos);
      console.log("Using IP-based location");
    } catch (err) {
      setLoading(false);
      alert("Unable to detect location. Please select manually on the map.");
    }
  };

  const watchLocation = (cb) => {
    if (!navigator.geolocation) return;
    if (watchIdRef.current !== null) return;

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        cb({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.error("Watch error:", err),
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      }
    );
  };

  const clearWatch = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  return { getCurrentLocation, watchLocation, clearWatch, loading };
};

export default useUserLocation;