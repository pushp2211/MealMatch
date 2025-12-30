import { NavigationControl } from "react-map-gl/mapbox";
import { Crosshair, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

const MapControls = ({ 
  onRecenter, 
  onToggleStyle, 
  isNavigation 
}) => {
  return (
    <>
      {/* 1. Standard Mapbox Controls (Zoom, Compass) */}
      <NavigationControl position="bottom-right" showCompass={true} showZoom={true} />

      {/* 2. Custom Floating Action Buttons (Top Right) */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        {/* Recenter Button */}
        <Button
          variant="secondary"
          size="icon"
          className="shadow-lg bg-background/90 backdrop-blur hover:bg-background h-10 w-10"
          onClick={onRecenter}
          title={isNavigation ? "Recenter Route" : "My Location"}
        >
          <Crosshair className="w-5 h-5 text-primary" />
        </Button>

        {/* Layer Toggle Button */}
        <Button
          variant="secondary"
          size="icon"
          className="shadow-lg bg-background/90 backdrop-blur hover:bg-background h-10 w-10"
          onClick={onToggleStyle}
          title="Toggle Satellite View"
        >
          <Layers className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>
    </>
  );
};

export default MapControls;