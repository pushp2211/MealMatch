import { Button } from '@/components/ui/button';
import { Navigation } from 'lucide-react';

const PickupLocation = ({ pickup, onNavigate }) => {
  const hasCoords =
    Array.isArray(pickup.food.location.coordinates) &&
    pickup.food.location.coordinates.length === 2;

  return (
    <div className="p-4 rounded-xl border bg-card">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <p className="text-sm text-muted-foreground">
            Pickup Location
          </p>
          <p className="font-medium">
            {pickup.food.location.address || "Address not available"}
          </p>
        </div>

        <Button
          size="sm"
          disabled={!hasCoords}
          onClick={() => {
            if (!hasCoords) {
              alert("Pickup location coordinates not available");
              return;
            }
            onNavigate();
          }}
        >
          <Navigation className="w-4 h-4 mr-2" />
          Navigate
        </Button>
      </div>
    </div>
  );
};

export default PickupLocation;
