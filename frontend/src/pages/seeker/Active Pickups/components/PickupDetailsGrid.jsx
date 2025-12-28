import { Clock, MapPin, Utensils } from 'lucide-react';
import { getSeekerTimeRemaining } from '@/data/seekerMockData';

const PickupDetailsGrid = ({ pickup }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    <Detail icon={Utensils} label="Quantity">
      {pickup.requestedQuantity} {pickup.food.quantityUnit}
    </Detail>

    <Detail icon={MapPin} label="Distance">
      {pickup.food.provider.distance} km
    </Detail>

    <Detail icon={Clock} label="ETA">
      {pickup.eta || 15} min
    </Detail>

    <div className="p-3 rounded-xl bg-warning-light">
      <div className="flex items-center gap-2 text-warning mb-1">
        <Clock className="w-4 h-4" />
        <span className="text-xs">Pickup By</span>
      </div>
      <p className="font-semibold text-warning">
        {getSeekerTimeRemaining(pickup.food.availableTo)}
      </p>
    </div>
  </div>
);

const Detail = ({ icon: Icon, label, children }) => (
  <div className="p-3 rounded-xl bg-muted/50">
    <div className="flex items-center gap-2 text-muted-foreground mb-1">
      <Icon className="w-4 h-4" />
      <span className="text-xs">{label}</span>
    </div>
    <p className="font-semibold">{children}</p>
  </div>
);

export default PickupDetailsGrid;
