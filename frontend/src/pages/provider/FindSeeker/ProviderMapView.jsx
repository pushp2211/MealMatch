import { motion } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import { Search, Navigation } from "lucide-react";

import MapView from "@/components/maps/MapView";
import MarkerLayer from "@/components/maps/layers/MarkerLayer";
import UserLocationMarker from "@/components/maps/layers/UserLocationMarker";
import RadiusLayer from "@/components/maps/layers/RadiusLayer";
import MapControls from "@/components/maps/controls/MapControls";
import useUserLocation from "@/components/maps/hooks/useUserLocation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

import SeekerList from "./components/SeekerList";
import SeekerCard from "./components/SeekerCard";
import useProviderMap from "./useProviderMap";
import api from "@/utils/axios";

const DEFAULT_CENTER = { lat: 12.9716, lng: 77.5946 };
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const STYLE_STREETS = "mapbox://styles/mapbox/streets-v12";
const STYLE_SATELLITE = "mapbox://styles/mapbox/satellite-streets-v12";

const ProviderMapView = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const etaDebounceRef = useRef(null);

  // --- STATE ---
  const { getCurrentLocation, clearWatch, loading: gpsLoading } = useUserLocation();
  const [userLocation, setUserLocation] = useState(DEFAULT_CENTER);
  
  // New Local state for UI Loader control
  const [isLocating, setIsLocating] = useState(true); 

  // Simulated Backend Data
  const [seekersFromApi, setSeekersFromApi] = useState([]);
  const [radius, setRadius] = useState(5);
  const [selectedSeeker, setSelectedSeeker] = useState(null);
  const [mapStyle, setMapStyle] = useState(STYLE_STREETS);
  
  // --- ETA STATE ---
  const [etaMinutes, setEtaMinutes] = useState(null);
  const [etaLoading, setEtaLoading] = useState(false);

  // Search State
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  /* --------------- 1. FETCH PROVIDER MAP DATA --------------- */
  useEffect(() => {
    const fetchProviderMap = async () => {
      try {
        const res = await api.get("/api/pickup-requests/provider/map");

        const normalized = res.data.requests
          .map((r) => {
            const coords = r.seeker?.location?.coordinates;
            if (!coords) return null;

            return {
              id: r._id,
              requestId: r._id,
              requestStatus: r.status,

              name: r.seeker.name,
              phone: r.seeker.phone,
              verified: r.seeker.isVerified,
              type: r.seeker.seekerType,

              distance: r.distanceKm,

              location: {
                lng: coords[0],
                lat: coords[1],
              },
            };
          })
          .filter(Boolean);

        setSeekersFromApi(normalized);
      } catch (err) {
        console.error("Failed to load provider map data", err);
      }
    };

    fetchProviderMap();
  }, []);

  // --- 2. MAP HOOK ---
  const mapMarkers = useProviderMap(seekersFromApi, userLocation, radius);
  
  // Initial Location Only
  useEffect(() => {
    setIsLocating(true);
    getCurrentLocation((loc) => {
      if (loc) setUserLocation(loc);
      setIsLocating(false); // Stop loader after first fetch
    });
    return () => clearWatch(); 
  }, []);

  // Fly to User Location
  useEffect(() => {
    if (mapRef.current && userLocation && !selectedSeeker) {
        mapRef.current.flyTo({ 
          center: [userLocation.lng, userLocation.lat], 
          zoom: 13,
          speed: 1.2
        });
    }
  }, [userLocation, selectedSeeker]);

  // Fly to Selected Seeker 
  useEffect(() => {
    if (selectedSeeker && mapRef.current) {
      // FIX: Access nested location object safely
      // const lat = selectedSeeker.location?.lat;
      // const lng = selectedSeeker.location?.lng;
      const { lat, lng } = selectedSeeker.location || {};
      if (lat && lng) {
        mapRef.current.flyTo({
          center: [lng, lat],
          zoom: 15,
          speed: 1.5
        });
      } else {
        console.error("Invalid seeker coordinates", selectedSeeker);
      }
    }
  }, [selectedSeeker]);

  /* ================= REAL ETA (ON DEMAND + DEBOUNCED) ================= */
  useEffect(() => {
    if (!selectedSeeker || !userLocation) return;

    clearTimeout(etaDebounceRef.current);
    setEtaLoading(true);
    setEtaMinutes(null);

    etaDebounceRef.current = setTimeout(async () => {
      try {
        const from = userLocation;
        const to = selectedSeeker.location;

        const res = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${from.lng},${from.lat};${to.lng},${to.lat}?access_token=${MAPBOX_TOKEN}&overview=false`
        );

        const data = await res.json();
        const seconds = data?.routes?.[0]?.duration;

        if (seconds) {
          setEtaMinutes(Math.ceil(seconds / 60));
        }
      } catch (err) {
        console.error("ETA calculation failed", err);
      } finally {
        setEtaLoading(false);
      }
    }, 400); // debounce

    return () => clearTimeout(etaDebounceRef.current);
  }, [selectedSeeker, userLocation]);

  // Map Style Toggle
  useEffect(() => {
    if (mapRef.current && mapRef.current.getMap()) {
        mapRef.current.getMap().setStyle(mapStyle);
    }
  }, [mapStyle]);

  // Resize Observer
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const performResize = () => {
      if (mapRef.current?.getMap()) mapRef.current.getMap().resize();
    };
    const observer = new ResizeObserver(() => {
      performResize();
      setTimeout(performResize, 300);
    });
    observer.observe(mapContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // --- HANDLERS ---
  
  // Search Autocomplete
  useEffect(() => {
    if (!query) { setSuggestions([]); return; }
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?autocomplete=true&country=IN&access_token=${MAPBOX_TOKEN}`
        );
        const data = await res.json();
        setSuggestions(data.features || []);
        setShowSuggestions(true);
      } catch (e) { console.error(e); }
    }, 350);
    return () => clearTimeout(timeout);
  }, [query]);

  // Handle "Get Location" Click
  const handleLocateMe = () => {
    clearWatch(); 
    setSelectedSeeker(null);
    setIsLocating(true); // START LOADER
    
    getCurrentLocation((loc) => {
       if(loc) setUserLocation(loc);
       setIsLocating(false); // STOP LOADER
    });
  };

  // Handle Search Result Click
  const handleSelectLocation = (lng, lat, name) => {
    setSelectedSeeker(null);
    setUserLocation({ lat, lng });
    setQuery(name);
    setShowSuggestions(false);
  };

  const toggleMapStyle = () => {
    setMapStyle(prev => prev === STYLE_STREETS ? STYLE_SATELLITE : STYLE_STREETS);
  };

  return (
    <div className="flex flex-col h-full w-full bg-background">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b bg-card shrink-0 z-30 relative"
      >
        <div className="flex flex-col lg:flex-row gap-4 p-4">
          {/* SEARCH & GPS */}
          <div className="flex flex-1 gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search area..."
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 mt-1 w-full bg-popover border rounded-md shadow-lg overflow-hidden">
                  {suggestions.map((s) => (
                    <div
                      key={s.id}
                      className="px-3 py-2 text-sm hover:bg-muted cursor-pointer"
                      onMouseDown={(e) => {
                         e.preventDefault();
                         handleSelectLocation(s.center[0], s.center[1], s.place_name);
                      }}
                    >
                      {s.place_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <Button
              variant="outline"
              disabled={isLocating || gpsLoading} // Disable while loading
              onClick={handleLocateMe}
            >
              <Navigation className="w-4 h-4 lg:mr-2" />
              <span className="hidden lg:inline">
                {isLocating ? "Locating..." : "Locate Me"}
              </span>
            </Button>
          </div>

          {/* RADIUS SLIDER */}
          <div className="flex items-center gap-4 min-w-[280px]">
             <span className="text-sm text-muted-foreground">Range</span>
             <Slider
                min={1} max={50} step={1}
                value={[radius]}
                onValueChange={(v) => setRadius(v[0])}
                className="flex-1"
             />
             <div className="flex items-center gap-2">
                <span className="text-sm font-medium w-12 text-right">{radius} km</span>
                <Badge variant="secondary" className="hidden sm:inline-flex">
                    {mapMarkers.length} found
                </Badge>
             </div>
          </div>
        </div>
      </motion.div>

      {/* MAP & SIDEBAR CONTAINER */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden relative z-0">
        
        {/* MAP PANEL */}
        <div ref={mapContainerRef} className="flex-none lg:flex-1 h-[50vh] lg:h-auto relative transition-all">
           
           <MapView center={userLocation} mapRef={mapRef} mapStyle={mapStyle}>
              <UserLocationMarker location={userLocation} />
              <RadiusLayer mapRef={mapRef} center={userLocation} radiusKm={radius} />
              
              <MarkerLayer
                 items={mapMarkers}
                 selectedId={selectedSeeker?.id}
                 onSelect={(m) => setSelectedSeeker(m.data)}
              />

              <MapControls 
                 onRecenter={() => {
                    setSelectedSeeker(null);
                    mapRef.current?.flyTo({ center: [userLocation.lng, userLocation.lat], zoom: 13 });
                 }}
                 onToggleStyle={toggleMapStyle}
                 isNavigation={false}
              />
           </MapView>

            {/* --- GPS LOADER OVERLAY (NEW) --- */}
            {(isLocating || gpsLoading) && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-4">
                <div className="bg-card border shadow-lg rounded-xl p-6 flex flex-col items-center gap-4 max-w-xs animate-in fade-in zoom-in duration-300">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-muted rounded-full"></div>
                    <div className="absolute top-0 left-0 w-12 h-12 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                    <Navigation className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Acquiring Location</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Calibrating your position for accurate nearby results...
                    </p>
                  </div>
                </div>
              </div>
            )}

           {/* CARD INSIDE CONTAINER */}
           <SeekerCard
              seeker={selectedSeeker}
              etaMinutes={etaMinutes}
              etaLoading={etaLoading}
              onClose={() => setSelectedSeeker(null)}
           />

        </div>

        {/* SIDEBAR PANEL */}
        <SeekerList
           seekers={mapMarkers.map(m => m.data)}
           selectedId={selectedSeeker?.id}
           onSelect={setSelectedSeeker}
        />
      </div>
    </div>
  );
};

export default ProviderMapView;