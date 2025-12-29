import { useState } from 'react';

const useUserLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoading(false);
      },
      () => {
        setLoading(false);
        alert('Location permission denied');
      }
    );
  };

  return { location, getCurrentLocation, loading };
};

export default useUserLocation;
