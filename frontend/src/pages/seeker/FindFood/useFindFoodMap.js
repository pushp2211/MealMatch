import { useMemo } from "react";

const haversine = (lat1, lng1, lat2, lng2) => {
  if (!lat1 || !lng1 || !lat2 || !lng2) return null;

  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const useFindFoodMap = (foods, userLocation) => {
  return useMemo(() => {
    return foods.map((food) => {
      // 1. Calculate Distance if user location exists
      let distance = null;

      if (userLocation && food.location) {
        // Backend sends location as { lat, lng, address }
        const foodLat = food.location.lat;
        const foodLng = food.location.lng;

        const distVal = haversine(
          userLocation.lat,
          userLocation.lng,
          foodLat,
          foodLng
        );

        if (distVal !== null) {
          distance = distVal.toFixed(1); // e.g., "5.2"
        }
      }

      return {
        id: food.id,
        lat: food.location.lat,
        lng: food.location.lng,
        
        // 2. Inject calculated distance into the data object
        data: {
          ...food,
          distance: distance,
        },

        type: "provider",
        status: food.provider?.verified ? "verified" : "normal",
      };
    });
  }, [foods, userLocation]);
};

export default useFindFoodMap;