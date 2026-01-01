import { useState, useRef ,useEffect } from "react";
import { Source, Layer } from "react-map-gl/mapbox";
import mapboxgl from "mapbox-gl";

const MIN_ROUTE_INTERVAL = 4000; // ms → max 1 route request per 4s
const MIN_MOVE_DISTANCE = 0.015; // km → ~15 meters

const RouteLayer = ({ mapRef, from, to, onRouteData }) => {
  const [routeGeoJSON, setRouteGeoJSON] = useState(null);
  // Throttle refs (do NOT cause re-renders)
  const lastRouteTimeRef = useRef(0);
  const lastFromRef = useRef(null);

  useEffect(() => {
    if (!from || !to) return;

    const now = Date.now();
    // Time-based throttle
    if (now - lastRouteTimeRef.current < MIN_ROUTE_INTERVAL) {
      return;
    }

    // Distance-based throttle
    if (lastFromRef.current) {
      const prev = lastFromRef.current;

      const distanceMoved = mapboxgl.LngLat
        .convert([prev.lng, prev.lat])
        .distanceTo(mapboxgl.LngLat.convert([from.lng, from.lat]));

      // distanceTo returns meters
      if (distanceMoved < MIN_MOVE_DISTANCE * 1000) {
        return;
      }
    }

    lastRouteTimeRef.current = now;
    lastFromRef.current = from;

    const fetchRoute = async () => {
      try {
        const query = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${from.lng},${from.lat};${to.lng},${to.lat}?geometries=geojson&overview=full&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
        );
        
        const data = await query.json();

        if (!data.routes || !data.routes.length) return;

        const route = data.routes[0];
        
        setRouteGeoJSON({
          type: "Feature",
          geometry: route.geometry,
        });

        // Calculate Bounds (The box that fits the route)
        const coords = route.geometry.coordinates;
        const bounds = coords.reduce(
          (b, c) => b.extend(c),
          new mapboxgl.LngLatBounds(coords[0], coords[0])
        );

        // Initial Auto-Fit
        if (mapRef.current) {
          mapRef.current.getMap().fitBounds(bounds, {
            padding: 50,
            duration: 1500
          });
        }

        // KEY CHANGE: Pass 'bounds' up to parent so the button can use it
        onRouteData?.({
          distance: route.distance,
          duration: route.duration,
          bounds: bounds
        });

      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, [from, to, mapRef]);

  if (!routeGeoJSON) return null;

  return (
    <Source id="route-source" type="geojson" data={routeGeoJSON}>
      {/* Casing Layer (Border) */}
      <Layer
        id="route-casing"
        type="line"
        layout={{ "line-join": "round", "line-cap": "round" }}
        paint={{
          "line-color": "#155e75",
          "line-width": 8,
          "line-opacity": 0.8
        }}
        beforeId="waterway-label"
      />
      {/* Inner Line (Route) */}
      <Layer
        id="route-inner"
        type="line"
        layout={{ "line-join": "round", "line-cap": "round" }}
        paint={{
          "line-color": "#3b82f6",
          "line-width": 6,
          "line-opacity": 1
        }}
      />
    </Source>
  );
};

export default RouteLayer;