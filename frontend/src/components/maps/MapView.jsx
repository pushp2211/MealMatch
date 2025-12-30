import Map from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const MapView = ({ center, zoom = 12, mapRef, mapStyle, children }) => {
  return (
    <div className="w-full h-full relative">
      <Map
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={{
          longitude: center.lng,
          latitude: center.lat,
          zoom,
        }}
        mapStyle={mapStyle || "mapbox://styles/mapbox/streets-v12"} 
        style={{ width: "100%", height: "100%" }}
        attributionControl={false} // Optional: Cleaner look
      >
        {children}
      </Map>
    </div>
  );
};

export default MapView;