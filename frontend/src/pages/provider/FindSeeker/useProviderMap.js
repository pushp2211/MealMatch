const haversine = (lat1, lng1, lat2, lng2) => {
  const R = 6371; 
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const useProviderMap = (seekers, userLocation, radiusKm) => {
  if (!userLocation || !seekers) return [];

  return seekers
    .map((seeker) => {
      // BACKEND READINESS:
      // We assume 'seeker.location' exists. If your backend sends it differently (e.g. seeker.geo.lat),
      // adjust this destructuring here.
      const { lat, lng } = seeker.location || {};
      // If data is missing coordinates, skip it (or handle error)
      if (!lat || !lng) return null;

      // Calculate real-time distance from user to this seeker
      const currentDistance = haversine(userLocation.lat, userLocation.lng, lat, lng).toFixed(1);

      return {
        id: seeker.id,
        lat: lat,
        lng: lng,
        // merge the calculated distance into the data for the UI card
        data: { ...seeker, distance: currentDistance },
        type: "seeker",
        status: seeker.requestStatus === 'accepted' ? 'active' : (seeker.verified ? 'verified' : 'normal'),
      };
    })
    .filter((item) => item !== null) // Remove valid items
    .filter((marker) => {
      // Filter by radius slider
      return parseFloat(marker.data.distance) <= radiusKm;
    });
};

export default useProviderMap;