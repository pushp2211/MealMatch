import { Button } from '@/components/ui/button';
import { Navigation } from 'lucide-react';

const PickupLocation = ({ pickup, onNavigate }) => (
  <div className="p-4 rounded-xl border bg-card">
    <div className="flex items-start justify-between gap-3 flex-wrap">
      <div>
        <p className="text-sm text-muted-foreground">Pickup Location</p>
        <p className="font-medium">
          {pickup.food.location.address}
        </p>
      </div>
      <Button size="sm" onClick={onNavigate}>
        <Navigation className="w-4 h-4 mr-2" />
        Navigate
      </Button>
    </div>
  </div>
);

export default PickupLocation;
