import { Marker } from 'react-map-gl/mapbox';
import { MapPin } from 'lucide-react';

const MarkerLayer = ({ items = [], onMarkerClick }) => {
  return (
    <>
      {items.map((item) => {
        const location = item?.provider?.location;
        if (!location) return null;

        return (
          <Marker
            key={item.id}
            latitude={location.lat}
            longitude={location.lng}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              onMarkerClick?.(item);
            }}
          >
            <MapPin className="w-6 h-6 text-info cursor-pointer" />
          </Marker>
        );
      })}
    </>
  );
};

export default MarkerLayer;
