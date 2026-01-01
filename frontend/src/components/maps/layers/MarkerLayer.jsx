import { Marker } from "react-map-gl/mapbox";
import PinMarker from "@/components/maps/markers/PinMarker";
import { getPinConfig } from "../utils/getPinConfig";

const MarkerLayer = ({ items = [], selectedId, onSelect }) => {
  return (
    <>
      {items.map((item) => {
        const isSelected = selectedId === item.id;
        const { color, size, zIndex } = getPinConfig(item, isSelected);

        return (
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
            <div style={{ zIndex }}>
              <PinMarker
                color={color}
                size={size}
                active={isSelected}
              />
            </div>
          </Marker>
        );
      })}
    </>
  );
};

export default MarkerLayer;