import { useState, useMemo, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Navigation,
  Leaf,
  Drumstick,
  Timer,
  Utensils,
} from 'lucide-react';
import { toast } from 'sonner';

import {
  mockAvailableFood,
  getSeekerTimeRemaining,
} from '@/data/seekerMockData';

import BaseMap from '@/components/maps/BaseMap';
import MarkerLayer from '@/components/maps/MarkerLayer';
import Controls from '@/components/maps/Controls';
import useUserLocation from '@/components/maps/hooks/useUserLocation';
import { MAP_STYLES } from '@/components/maps/mapStyles';

const DEFAULT_CENTER = {
  lat: 12.9716,
  lng: 77.5946, 
};

const SeekerFindFood = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [radius, setRadius] = useState(5);
  const [selectedFood, setSelectedFood] = useState(null);
  const [requestQuantity, setRequestQuantity] = useState(10);
  const [requestNote, setRequestNote] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [mapStyle, setMapStyle] = useState(MAP_STYLES.streets);

  /* 📍 User location */
  const { location, getCurrentLocation } = useUserLocation();
  const mapCenter = location || DEFAULT_CENTER;

  /* 🆕 REF: Create a reference for the map container */
  const mapContainerRef = useRef(null);

  /* 🆕 EFFECT: Watch for container resize and force Map update */
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      window.dispatchEvent(new Event('resize'));
    });
    resizeObserver.observe(mapContainerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  /* 🔍 Filter food */
  const filteredFood = useMemo(() => {
    return mockAvailableFood.filter((food) => {
      const matchesSearch =
        food.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.provider.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRadius = food.provider.distance <= radius;
      return matchesSearch && matchesRadius;
    });
  }, [searchQuery, radius]);

  /* 🎯 Handlers */
  const handleGetLocation = () => {
    getCurrentLocation();
    toast.success('Location updated');
  };

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    setRequestQuantity(Math.min(10, food.quantity));
  };

  const handleSubmitRequest = () => {
    setShowConfirmDialog(false);
    setSelectedFood(null);
    setRequestNote('');

    toast.success('Request sent successfully!', {
      description: `Your request for ${requestQuantity} ${selectedFood?.quantityUnit} has been sent to ${selectedFood?.provider.name}`,
    });
  };

  /* 🍽️ UI helpers */
  const getFoodTypeIcon = (type) => {
    switch (type) {
      case 'veg':
        return <Leaf className="w-4 h-4 text-success" />;
      case 'non-veg':
        return <Drumstick className="w-4 h-4 text-destructive" />;
      default:
        return <Utensils className="w-4 h-4 text-warning" />;
    }
  };

  return (
    <div className="flex bg-amber-300 flex-col w-full h-full">
      {/* 🔝 Top Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 border-b bg-card shrink-0" // added shrink-0 to prevent compression
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-1 gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search area or food..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button
              variant={location ? 'default' : 'outline'}
              onClick={handleGetLocation}
            >
              <Navigation className="w-4 h-4 mr-2" />
              {location ? 'GPS Active' : 'Get Location'}
            </Button>
          </div>

          <div className="flex items-center gap-4 min-w-[280px]">
            <span className="text-sm text-muted-foreground">Radius:</span>
            <Slider
              value={[radius]}
              onValueChange={(v) => setRadius(v[0])}
              min={1}
              max={15}
              step={1}
              className="flex-1"
            />
            <span className="text-sm font-medium text-info w-12">
              {radius} km
            </span>
            <Badge variant="info">{filteredFood.length} posts</Badge>
          </div>
        </div>
      </motion.div>

      {/* 🧭 Main Content */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* 🗺️ Map Section */}
        {/* FIX APPLIED HERE:
            1. h-[350px]: Fixed height on mobile so it doesn't take full screen.
            2. flex-none: Prevents map from growing on mobile.
            3. lg:flex-1 / lg:h-auto: Resets to full fluid width/height on desktop.
        */}
        <div 
          ref={mapContainerRef}
          className="h-[350px] lg:h-auto flex-none lg:flex-1 relative z-0"
        >
          <BaseMap center={mapCenter} mapStyle={mapStyle}>
            <MarkerLayer
              items={filteredFood}
              onMarkerClick={handleFoodClick}
            />
          </BaseMap>

          <Controls
            onZoomIn={() => {}}
            onZoomOut={() => {}}
            onToggleStyle={() =>
              setMapStyle((prev) =>
                prev === MAP_STYLES.streets
                  ? MAP_STYLES.satellite
                  : MAP_STYLES.streets
              )
            }
          />

          {location && (
            <div className="absolute bottom-4 left-4 z-10">
              <Badge variant="info">
                <Navigation className="w-3 h-3 mr-1" />
                GPS Active
              </Badge>
            </div>
          )}
        </div>

        {/* 📋 Food List */}
        {/* FIX APPLIED HERE:
            1. flex-1: On mobile, takes remaining height after map.
            2. overflow-y-auto: Allows scrolling ONLY inside this div.
            3. lg:flex-none / lg:w-80: Resets to fixed sidebar on desktop.
        */}
        <div className="flex-1 lg:flex-none w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l bg-card overflow-y-auto z-10">
          <div className="p-4 space-y-3">
            <h3 className="font-semibold">Nearby Food</h3>

            {filteredFood.map((food) => (
              <motion.div
                key={food.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => handleFoodClick(food)}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-muted">
                        {getFoodTypeIcon(food.foodType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">
                          {food.title}
                        </h4>
                        <p className="text-sm text-muted-foreground truncate">
                          {food.provider.name}
                        </p>
                        <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {food.provider.distance} km
                          </span>
                          <span className="flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            {getSeekerTimeRemaining(food.bestBefore)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 🪟 Modals */}
      <AnimatePresence>
        {selectedFood && !showConfirmDialog && (
          <Dialog
            open={!!selectedFood}
            onOpenChange={() => setSelectedFood(null)}
          >
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getFoodTypeIcon(selectedFood.foodType)}
                  {selectedFood.title}
                </DialogTitle>
                <DialogDescription>
                  from {selectedFood.provider.name}
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setSelectedFood(null)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setShowConfirmDialog(true)}>
                  Request Food
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <Dialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Request</DialogTitle>
            <DialogDescription>
              Please review your request before submitting
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Back
            </Button>
            <Button onClick={handleSubmitRequest}>
              Confirm Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SeekerFindFood;