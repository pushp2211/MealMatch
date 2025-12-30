import { Marker } from "react-map-gl/mapbox";
import { MapPin } from "lucide-react";

const MarkerLayer = ({ items = [], selectedId, onSelect }) => {
  return (
    <>
      {items.map((item) => (
        <Marker
          key={item.id}
          longitude={item.lng}
          latitude={item.lat}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            onSelect(item);
          }}
        >
          <MapPin
            className={`w-7 h-7 cursor-pointer transition-transform ${
              selectedId === item.id
                ? "text-red-500 scale-110"
                : "text-info"
            }`}
          />
        </Marker>
      ))}
    </>
  );
};

export default MarkerLayer;
