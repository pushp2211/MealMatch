import { useEffect } from "react";

/* Create GeoJSON circle */
const createCircleGeoJSON = (center, radiusKm) => {
  const points = 64;
  const coords = [];
  const earthRadius = 6371;

  for (let i = 0; i <= points; i++) {
    const angle = (i * 360) / points;
    const rad = (angle * Math.PI) / 180;

    const lat =
      center.lat +
      (radiusKm / earthRadius) * (180 / Math.PI) * Math.cos(rad);
    const lng =
      center.lng +
      ((radiusKm / earthRadius) * (180 / Math.PI) * Math.sin(rad)) /
        Math.cos((center.lat * Math.PI) / 180);

    coords.push([lng, lat]);
  }

  return {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [coords],
    },
  };
};

const RadiusLayer = ({ mapRef, center, radiusKm }) => {
  useEffect(() => {
    if (!mapRef.current || !center) return;

    const map = mapRef.current.getMap();
    if (!map) return;

    const sourceId = "radius-circle";
    const fillLayerId = "radius-fill";
    const outlineLayerId = "radius-outline";

    const data = createCircleGeoJSON(center, radiusKm);

    const addOrUpdate = () => {
      if (map.getSource(sourceId)) {
        map.getSource(sourceId).setData(data);
        return;
      }

      map.addSource(sourceId, {
        type: "geojson",
        data,
      });

      map.addLayer({
        id: fillLayerId,
        type: "fill",
        source: sourceId,
        paint: {
          "fill-color": "#2563eb",
          "fill-opacity": 0.15,
        },
      });

      map.addLayer({
        id: outlineLayerId,
        type: "line",
        source: sourceId,
        paint: {
          "line-color": "#2563eb",
          "line-width": 2,
        },
      });
    };

    // CRITICAL FIX
    if (map.isStyleLoaded()) {
      addOrUpdate();
    } else {
      map.once("load", addOrUpdate);
    }
  }, [mapRef, center, radiusKm]);

  return null;
};

export default RadiusLayer;
