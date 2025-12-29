import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useMapContext } from './MapProvider';
import { MAP_STYLES } from './mapStyles';

const BaseMap = ({
  center,
  zoom = 13,
  mapStyle = MAP_STYLES.streets,
  onMove,
  children,
}) => {
  const { mapboxToken } = useMapContext();

  return (
    <Map
      mapboxAccessToken={mapboxToken}
      initialViewState={{
        latitude: center.lat,
        longitude: center.lng,
        zoom,
      }}
      mapStyle={mapStyle}
      style={{ width: '100%', height: '100%' }}
      onMove={onMove}
    >
      {children}
    </Map>
  );
};

export default BaseMap;
