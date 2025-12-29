import { createContext, useContext } from 'react';
import { MAPBOX_TOKEN } from './utils/mapbox';

const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
  if (!MAPBOX_TOKEN) {
    console.error('❌ VITE_MAPBOX_TOKEN is missing');
  }

  return (
    <MapContext.Provider
      value={{
        mapboxToken: MAPBOX_TOKEN,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error(
      'useMapContext must be used inside <MapProvider />'
    );
  }
  return context;
};
