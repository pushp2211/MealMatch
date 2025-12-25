import { useEffect } from "react";
import { renderMarkers } from "../../../components/maps/MarkerLayer";

export function useProviderMarkers(map, seekers, onSelect) {
  useEffect(() => {
    if (!map || !seekers.length) return;

    const cleanup = renderMarkers(
      map,
      seekers.map((s) => ({
        ...s,
        coordinates: s.location,
      })),
      onSelect,
      "green"
    );

    return cleanup;
  }, [map, seekers, onSelect]);
}
