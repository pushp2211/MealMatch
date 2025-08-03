import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function MapComponent({ userLocation, seekers = [] }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const seekerMarkersRef = useRef([]);

  // Initial map setup
  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: userLocation || [77.5946, 12.9716],
      zoom: 11,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    return () => mapRef.current.remove();
  }, []);

  // User location marker
  useEffect(() => {
    if (!userLocation || !mapRef.current) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }

    const newMarker = new mapboxgl.Marker({ color: "red" })
      .setLngLat(userLocation)
      .setPopup(new mapboxgl.Popup().setText("You are here"))
      .addTo(mapRef.current);

    userMarkerRef.current = newMarker;

    mapRef.current.flyTo({ center: userLocation, zoom: 14 });
  }, [userLocation]);

  // Seeker markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear old markers
    seekerMarkersRef.current.forEach((marker) => marker.remove());
    seekerMarkersRef.current = [];

    seekers.forEach((seeker) => {
      const { coordinates } = seeker.location;

      const marker = new mapboxgl.Marker({ color: "green" })
        .setLngLat(coordinates)
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <div class="text-sm">
              <div class="font-bold">${seeker.name}</div>
              <div>${seeker.foodDetails?.title || "Food Available"}</div>
              <div>Rating: ${seeker.rating ?? "N/A"}</div>
            </div>
          `)
        )
        .addTo(mapRef.current);

      seekerMarkersRef.current.push(marker);
    });
  }, [seekers]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[500px] rounded-xl shadow-lg"
    />
  );
}

export default MapComponent;

