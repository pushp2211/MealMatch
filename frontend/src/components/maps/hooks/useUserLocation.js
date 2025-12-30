import { useState } from "react";

const useUserLocation = () => {
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = (onSuccess) => {
    if (!navigator.geolocation) return;

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLoading(false);
        onSuccess({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        setLoading(false);
        alert("Unable to fetch location");
      }
    );
  };

  return { getCurrentLocation, loading };
};

export default useUserLocation;
