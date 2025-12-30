import { useState, useEffect } from "react";
import { Source, Layer } from "react-map-gl/mapbox";
import mapboxgl from "mapbox-gl";

const RouteLayer = ({ mapRef, from, to, onRouteData }) => {
  const [routeGeoJSON, setRouteGeoJSON] = useState(null);

  useEffect(() => {
    if (!from || !to) return;

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
          "line-width": 10,
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