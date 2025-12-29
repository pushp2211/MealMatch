import { useState, useRef } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Search, 
  Users, 
  Crosshair,
  Plus,
  Minus,
  Layers,
  Info
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { mockSeekers } from '@/data/mockData';

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [radius, setRadius] = useState(10);
  const [useGPS, setUseGPS] = useState(false);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const nearbySeekers = mockSeekers.filter(s => s.distance <= radius);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setUseGPS(true),
        () => console.log('Location denied')
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-0px)] flex flex-col">
        {/* Header with Controls */}
        <motion.div 
          className="p-4 md:p-6 border-b border-border bg-background"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col gap-4">
            {/* Title Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Map View</h1>
                <p className="text-muted-foreground text-sm">
                  View your location and nearby seekers
                </p>
              </div>
              <Badge variant="info" className="text-sm self-start sm:self-auto">
                <Users className="w-4 h-4 mr-1" />
                {nearbySeekers.length} seekers within {radius} km
              </Badge>
            </div>

            {/* Controls Row */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Location Controls */}
              <div className="flex flex-1 gap-2">
                <Button 
                  variant={useGPS ? 'default' : 'outline'} 
                  onClick={handleGetLocation}
                  className="shrink-0"
                >
                  <Crosshair className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{useGPS ? 'GPS Active' : 'Get Location'}</span>
                </Button>
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Radius Control */}
              <div className="flex items-center gap-4 min-w-[280px]">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Radius:</span>
                <Slider
                  value={[radius]}
                  onValueChange={([value]) => setRadius(value)}
                  min={1}
                  max={25}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-primary w-14">{radius} km</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Map Container */}
          <div className="flex-1 relative bg-muted min-h-[300px] lg:min-h-0">
            {showTokenInput ? (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
                <Card className="w-full max-w-md mx-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Enable Map View
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      To view the interactive map, please enter your Mapbox public token.
                      You can get one for free at{' '}
                      <a 
                        href="https://mapbox.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >
                        mapbox.com
                      </a>
                    </p>
                    <Input
                      placeholder="pk.xxx... (Mapbox public token)"
                      value={mapboxToken}
                      onChange={(e) => setMapboxToken(e.target.value)}
                    />
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        if (mapboxToken) setShowTokenInput(false);
                      }}
                      disabled={!mapboxToken}
                    >
                      Enable Map
                    </Button>
                    
                    {/* Preview placeholder */}
                    <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border border-border">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <MapPin className="w-8 h-8 text-primary" />
                          </div>
                          <p className="text-sm text-muted-foreground">Map preview will appear here</p>
                        </div>
                      </div>
                      {/* Fake markers for preview */}
                      <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-primary animate-pulse" />
                      <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-accent" />
                      <div className="absolute bottom-1/3 left-1/2 w-2 h-2 rounded-full bg-accent" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div 
                ref={mapContainer} 
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"
              >
                {/* Map placeholder with visual representation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Center marker (provider) */}
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg z-10 relative">
                      <MapPin className="w-6 h-6" />
                    </div>
                    {/* Radius circle */}
                    <div 
                      className="absolute rounded-full border-2 border-primary/30 bg-primary/5 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
                      style={{ 
                        width: `${radius * 30}px`, 
                        height: `${radius * 30}px`,
                      }}
                    />
                    {/* Seeker markers */}
                    {nearbySeekers.map((seeker, index) => {
                      const angle = (index * 360) / nearbySeekers.length;
                      const distance = seeker.distance * 12;
                      const x = Math.cos((angle * Math.PI) / 180) * distance;
                      const y = Math.sin((angle * Math.PI) / 180) * distance;
                      return (
                        <motion.div
                          key={seeker.id}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="absolute w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-md text-xs font-semibold"
                          style={{
                            left: `calc(50% + ${x}px - 16px)`,
                            top: `calc(50% + ${y}px - 16px)`,
                          }}
                        >
                          {seeker.name.charAt(0)}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button variant="secondary" size="icon" className="shadow-md">
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="icon" className="shadow-md">
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="icon" className="shadow-md">
                    <Layers className="w-4 h-4" />
                  </Button>
                </div>

                {/* Current location indicator */}
                {useGPS && (
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="success" className="shadow-md">
                      <Crosshair className="w-3 h-3 mr-1" />
                      GPS Active
                    </Badge>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar - Nearby Seekers */}
          <motion.div 
            className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-border bg-background p-4 space-y-4 overflow-y-auto max-h-[40vh] lg:max-h-none"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Nearby Seekers */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Nearby Seekers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {nearbySeekers.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No seekers in this radius
                  </p>
                ) : (
                  nearbySeekers.map((seeker) => (
                    <div
                      key={seeker.id}
                      className="flex items-center gap-3 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold text-sm">
                        {seeker.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{seeker.name}</p>
                        <p className="text-xs text-muted-foreground">{seeker.distance} km away</p>
                      </div>
                      {seeker.verified && (
                        <Badge variant="info" className="text-[10px]">Verified</Badge>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Info Note */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-info/10 text-sm">
              <Info className="w-4 h-4 text-info flex-shrink-0 mt-0.5" />
              <p className="text-muted-foreground">
                Seeker locations are shown anonymously. Contact details are only shared after accepting a pickup request.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MapView;