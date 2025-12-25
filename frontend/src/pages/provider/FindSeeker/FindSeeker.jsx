import { useState, useEffect } from "react";
import MapContainer from "../../../components/maps/MapContainer";
import { dummySeekers } from "./dummySeekers";
import { distanceInKm } from "./helpers";
import ActiveSeekerCard from "./ActiveSeekerCard";
import { useProviderMarkers } from "./useProviderMarkers";

function FindSeeker() {
  const providerLocation = [81.8463, 25.4358];

  const [radiusKm, setRadiusKm] = useState(5);
  const [visibleSeekers, setVisibleSeekers] = useState([]);
  const [activeSeeker, setActiveSeeker] = useState(null);
  const [map, setMap] = useState(null);

  // filter seekers
  useEffect(() => {
    const filtered = dummySeekers.filter((s) => {
      return distanceInKm(providerLocation, s.location) <= radiusKm;
    });
    setVisibleSeekers(filtered);
  }, [radiusKm]);

  // attach markers
  useProviderMarkers(map, visibleSeekers, setActiveSeeker);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex gap-3 items-center">
        <span>Radius:</span>
        <select
          value={radiusKm}
          onChange={(e) => setRadiusKm(Number(e.target.value))}
          className="border px-2 py-1"
        >
          <option value={1}>1 km</option>
          <option value={5}>5 km</option>
          <option value={10}>10 km</option>
        </select>
      </div>

      {/* Map */}
      <MapContainer
        center={providerLocation}
        onMapReady={setMap}
      />

      {/* Active seeker */}
      <ActiveSeekerCard seeker={activeSeeker} />
    </div>
  );
}

export default FindSeeker;
