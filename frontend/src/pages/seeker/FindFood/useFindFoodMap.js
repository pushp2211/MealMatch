const haversine = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const useFindFoodMap = (foods, center, radiusKm) => {
  return foods
    .filter((food) => {
      const { lat, lng } = food.provider.location;
      return haversine(center.lat, center.lng, lat, lng) <= radiusKm;
    })
    .map((food) => ({
      id: food.id,
      lat: food.provider.location.lat,
      lng: food.provider.location.lng,
      data: food,
    }));
};

export default useFindFoodMap;
