import { useRef } from "react";
import { useMap } from "./useMap";

function MapContainer({ center, onMapReady }) {
  const containerRef = useRef(null);
  const mapRef = useMap(containerRef, center);

  // notify parent once map is ready
  if (mapRef.current && onMapReady) {
    onMapReady(mapRef.current);
  }

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}

export default MapContainer;
