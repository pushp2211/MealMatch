import mapboxgl from "mapbox-gl";

export function renderMarkers(map, points, onClick, color = "green") {
  const markers = [];

  points.forEach((p) => {
    const marker = new mapboxgl.Marker({ color })
      .setLngLat(p.coordinates)
      .addTo(map);

    marker.getElement().addEventListener("click", () => onClick(p));

    markers.push(marker);
  });

  return () => markers.forEach((m) => m.remove());
}
