import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export function useMap(containerRef, center, zoom = 12) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center,
      zoom,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    return () => mapRef.current.remove();
  }, []);

  return mapRef;
}
