import { Marker } from "react-map-gl/mapbox";
import { Navigation } from "lucide-react";

const UserLocationMarker = ({ location }) => {
  if (!location) return null;

  return (
    <Marker longitude={location.lng} latitude={location.lat} anchor="center">
      <div className="bg-blue-600 text-white rounded-full p-2 shadow-lg">
        <Navigation className="w-4 h-4" />
      </div>
    </Marker>
  );
};

export default UserLocationMarker;
