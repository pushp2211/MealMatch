import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Search, Navigation, Loader2 } from "lucide-react";
import { toast } from "sonner";

import MapView from "@/components/maps/MapView";
import MarkerLayer from "@/components/maps/layers/MarkerLayer";
import UserLocationMarker from "@/components/maps/layers/UserLocationMarker";
import RadiusLayer from "@/components/maps/layers/RadiusLayer";
import RouteLayer from "@/components/maps/layers/RouteLayer";
import MapControls from "@/components/maps/controls/MapControls";

import useUserLocation from "@/components/maps/hooks/useUserLocation";
import useFindFoodMap from "./useFindFoodMap";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

import FoodList from "./components/FoodList";
import FoodCard from "./components/FoodCard";

import api from "@/utils/axios";
import { mockSeekerRequests } from "@/data/seekerMockData";
import { calculateBearing } from "@/components/maps/utils/calculateBearing";

import { sendPickupRequest } from "@/api/pickupRequest.api";

const DEFAULT_CENTER = { lat: 12.9716, lng: 77.5946 };
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const SESSION_LOCATION_KEY = "mealMatch:seeker:sessionLocation";

const STYLE_STREETS = "mapbox://styles/mapbox/streets-v12";
const STYLE_SATELLITE = "mapbox://styles/mapbox/satellite-streets-v12";

const formatDistance = (m) => `${(m / 1000).toFixed(1)} km`;
const formatDuration = (s) => `${Math.round(s / 60)} min`;

const SeekerFindFood = () => {
  const [foods, setFoods] = useState([]);
  const [loadingFoods, setLoadingFoods] = useState(false);

  const hasActivePickup = mockSeekerRequests.some(
    (req) => req.status === "accepted"
  );

  const [navBearing, setNavBearing] = useState(0);

  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const { state } = useLocation();

  // Navigation mode detection
  const isNavigation = state?.mode === "navigation";
  const pickup = state?.pickup;

  const destinationLocation =
    pickup?.food?.location ||
    pickup?.food?.provider?.location ||
    null;

  const {
    getCurrentLocation,
    watchLocation,
    clearWatch,
    loading: gpsLoading,
  } = useUserLocation();

  // SESSION LOCATION (PERSISTED)
  const [sessionLocation, setSessionLocation] = useState(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_LOCATION_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_CENTER;
    } catch {
      return DEFAULT_CENTER;
    }
  });

  // GPS Lock State to prevent routing from default location
  const [hasGPSLock, setHasGPSLock] = useState(false);

  const [radius, setRadius] = useState(5);
  const [selectedFood, setSelectedFood] = useState(null);
  const [mapStyle, setMapStyle] = useState(STYLE_STREETS);

  // Search state
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Route info (only for navigation mode)
  const [routeInfo, setRouteInfo] = useState(null);

  // ================= BEARING CALCULATION =================
  useEffect(() => {
    if (!isNavigation || !destinationLocation || !sessionLocation) return;
    const bearing = calculateBearing(sessionLocation, destinationLocation);
    setNavBearing(bearing);
  }, [isNavigation, sessionLocation, destinationLocation]);

  // PERSIST LOCATION
  useEffect(() => {
    try {
      sessionStorage.setItem(
        SESSION_LOCATION_KEY,
        JSON.stringify(sessionLocation)
      );
    } catch {
      // ignore storage errors
    }
  }, [sessionLocation]);

  // ================= NAVIGATION LOGIC (CHAINED & FIXED) =================
  useEffect(() => {
    if (!isNavigation) return;

    // 1. Reset lock immediately
    setHasGPSLock(false);
    clearWatch();

    // 2. Fetch Initial Location (One-time)
    getCurrentLocation((loc) => {
      // This runs ONLY after the hardware successfully returns a location
      if (loc) {
        setSessionLocation(loc);
        setHasGPSLock(true); //Signal acquired

        // 3. Start Continuous Tracking (Chained)
        // We start this inside the callback to prevent the "timeout" race condition.
        watchLocation((newLoc) => {
          setSessionLocation(newLoc);
          setHasGPSLock(true);
        });
      }
    });

    return () => {
      // Cleanup stops the tracker when leaving the page
      clearWatch();
    };
  }, [isNavigation]);

  useEffect(() => {
    if (!sessionLocation?.lat || !sessionLocation?.lng) return;

    // We use a timeout to wait for the user to stop sliding
    const timeoutId = setTimeout(async () => {
      try {
        setLoadingFoods(true);

        const res = await api.get("/api/food/nearby-providers", {
          params: {
            lat: sessionLocation.lat,
            lng: sessionLocation.lng,
            radius: radius * 1000, // Convert km to meters
          },
        });

        setFoods(res.data.posts || []);
        console.log("Fetched Foods:", res.data.posts);
      } catch (err) {
        console.error("Failed to fetch nearby food:", err);
      } finally {
        setLoadingFoods(false);
      }
    }, 600); // Wait 600ms after last change before calling API

    // Cleanup: If effect runs again (slider moved), cancel previous timer
    return () => clearTimeout(timeoutId);
  }, [sessionLocation, radius]); // Dependencies remain the same


  // Filter + markers (Browse Mode)
  const markers = useFindFoodMap(foods, sessionLocation);

  // Robust auto-resize for Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const performResize = () => {
      if (mapRef.current) {
        const map = mapRef.current.getMap();
        if (map) {
          map.resize();
        }
      }
    };

    const observer = new ResizeObserver(() => {
      performResize();
      setTimeout(performResize, 310);
    });
    observer.observe(mapContainerRef.current);
    window.addEventListener("resize", performResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", performResize);
    };
  }, []);

  // Fly map when user location changes
  useEffect(() => {
    if (!mapRef.current || !sessionLocation) return;
    if (isNavigation) return;
    mapRef.current.flyTo({
      center: [sessionLocation.lng, sessionLocation.lat],
      zoom: 13,
      speed: 1.2,
    });
  }, [sessionLocation, isNavigation, hasGPSLock]);

  // Fly to food when selected (browse mode only)
  useEffect(() => {
    if (isNavigation) return;
    if (!selectedFood || !mapRef.current) return;

    mapRef.current.flyTo({
      center: [
        // selectedFood.provider.location.lng,
        // selectedFood.provider.location.lat,
        selectedFood.location.lng,
        selectedFood.location.lat,
      ],
      zoom: 14,
      speed: 1.2,
    });
  }, [selectedFood, isNavigation]);

  // Handle Recenter Click
  const handleRecenter = () => {
    if (!mapRef.current) return;

    // Mode 1: Navigation - Fit Route
    if (isNavigation && routeInfo?.bounds) {
      mapRef.current.getMap().fitBounds(routeInfo.bounds, {
        padding: 50,
        duration: 1500,
        essential: true,
      });
      return;
    }

    // Mode 2: Browse - Fly to User Location
    if (sessionLocation) {
      mapRef.current.flyTo({
        center: [sessionLocation.lng, sessionLocation.lat],
        zoom: 14,
        speed: 1.2
      });
    }
  };

  const toggleMapStyle = () => {
    setMapStyle(prev => prev === STYLE_STREETS ? STYLE_SATELLITE : STYLE_STREETS);
  };

  // Autocomplete (debounced)
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?autocomplete=true&country=IN&access_token=${MAPBOX_TOKEN}`
        );
        const data = await res.json();
        setSuggestions(data.features || []);
        setShowSuggestions(true);
      } catch (e) {
        console.error(e);
      }
    }, 350);
    return () => clearTimeout(timeout);
  }, [query]);

  // Handle creating pickup request
  const handleRequestPickup = async ({ food, quantity, note }) => {
    try {
      await sendPickupRequest({
        foodPostId: food.id,
        quantityRequested: quantity,
        note,
        userLocation: sessionLocation,
      });

      toast.success("Pickup request sent successfully");
      setSelectedFood(null);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send pickup request"
      );
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b bg-card shrink-0"
      >
        {/* ================= TOP BAR (HIDDEN IN NAVIGATION MODE) ================= */}
        {!isNavigation && (
          <div className="flex flex-col lg:flex-row gap-4 p-4 ">
            <div className="flex flex-1 gap-2">
              {/* SEARCH */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search area or food..."
                  className="pl-9"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                />

                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-50 mt-1 w-full bg-card border rounded-md shadow">
                    {suggestions.map((s) => (
                      <div
                        key={s.id}
                        className="px-3 py-2 text-sm hover:bg-muted cursor-pointer"
                        onClick={() => {
                          const [lng, lat] = s.center;
                          setSessionLocation({ lat, lng });
                          setQuery(s.place_name);
                          setShowSuggestions(false);
                        }}
                      >
                        {s.place_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* GPS BUTTON */}
              <Button
                variant="outline"
                disabled={gpsLoading}
                onClick={() => {
                  clearWatch();
                  getCurrentLocation((loc) => {
                    if (loc) setSessionLocation(loc);
                  });
                }}
              >
                <Navigation className="w-4 h-4 mr-2" />
                {gpsLoading ? "Locating..." : "Get Location"}
              </Button>
            </div>

            {/* RADIUS */}
            <div className="flex items-center gap-4 min-w-[280px]">
              <span className="text-sm text-muted-foreground">Radius</span>
              <Slider
                min={1}
                max={50}
                step={1}
                value={[radius]}
                onValueChange={(v) => setRadius(v[0])}
                className="flex-1"
              />
              <span className="text-sm font-medium text-info w-12">
                {radius} km
              </span>
              <Badge variant="info">
                {loadingFoods ? <Loader2 className="w-3 h-3 animate-spin" /> : `${markers.length} posts`}
              </Badge>
            </div>
          </div>
        )}
      </motion.div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* MAP CONTAINER */}
        <div
          ref={mapContainerRef}
          className={`flex-none lg:flex-1 ${isNavigation ? 'h-[100vh]' : 'min-h-[60vh]'} lg:min-h-0 relative transition-all duration-300 ease-in-out`}
        >
          {/* MAP LOADING OVERLAY (When fetching foods) */}
          {!isNavigation && loadingFoods && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border shadow-sm flex items-center gap-2 animate-in fade-in zoom-in duration-200">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-xs font-medium">Scanning area...</span>
            </div>
          )}

          <MapView center={sessionLocation} mapRef={mapRef} mapStyle={mapStyle}>
            {/* User current location */}
            <UserLocationMarker
              location={sessionLocation}
              isNavigating={isNavigation}
              bearing={navBearing}
            />

            {/* MODULAR CONTROLS COMPONENT */}
            <MapControls
              onRecenter={handleRecenter}
              onToggleStyle={toggleMapStyle}
              isNavigation={isNavigation}
            />

            {/* Browse mode layers */}
            {!isNavigation && (
              <>
                <RadiusLayer
                  mapRef={mapRef}
                  center={sessionLocation}
                  radiusKm={radius}
                />

                <MarkerLayer
                  items={markers}
                  selectedId={selectedFood?.id}
                  onSelect={(m) => setSelectedFood(m.data)}
                />
              </>
            )}

            {/* Navigation mode layers - CONDITIONALLY RENDERED */}
            {isNavigation && pickup && (
              <>
                <MarkerLayer
                  items={[{
                    id: 'dest',
                    lat: destinationLocation.lat,
                    lng: destinationLocation.lng,
                    type: "destination",
                    status: "active",
                  }]}
                  selectedId='dest'
                  onSelect={() => { }}
                />

                {/* Only show route when GPS Lock is acquired */}
                {hasGPSLock && (
                  <RouteLayer
                    mapRef={mapRef}
                    from={sessionLocation}
                    to={destinationLocation}
                    onRouteData={setRouteInfo}
                  />
                )}
              </>
            )}
          </MapView>

          {/* LOADING OVERLAY (only in navigation mode) */}
          {isNavigation && !hasGPSLock && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-4">
              <div className="bg-card border shadow-lg rounded-xl p-6 flex flex-col items-center gap-4 max-w-xs animate-in fade-in zoom-in duration-300">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-muted rounded-full"></div>
                  <div className="absolute top-0 left-0 w-12 h-12 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                  <Navigation className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Acquiring GPS Signal</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Please wait while we locate you precisely for navigation.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* FOOD LIST (BROWSE MODE ONLY) */}
        {!isNavigation && (
          <FoodList
            foods={markers.map((m) => m.data)}
            selectedId={selectedFood?.id}
            onSelect={setSelectedFood}
          />
        )}
      </div>

      {/* ================= ETA CARD (NAVIGATION MODE) ================= */}
      {isNavigation && routeInfo && hasGPSLock && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card shadow-xl border rounded-full px-6 py-3 flex items-center gap-6 z-20 animate-in slide-in-from-bottom-5">
          <div className="flex flex-col items-center">
            <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Distance</span>
            <span className="font-bold text-lg">{formatDistance(routeInfo.distance)}</span>
          </div>
          <div className="w-px h-8 bg-border"></div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Time</span>
            <span className="font-bold text-lg text-blue-600">{formatDuration(routeInfo.duration)}</span>
          </div>
        </div>
      )}

      {/* ================= FOOD CARD ================= */}
      <FoodCard
        food={selectedFood}
        hasActivePickup={hasActivePickup}
        onClose={() => setSelectedFood(null)}
        onRequest={handleRequestPickup}
      />
    </div>
  );
};

export default SeekerFindFood;