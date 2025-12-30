import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Timer } from "lucide-react";
import { getSeekerTimeRemaining } from "@/data/seekerMockData";

const FoodCard = ({ food, onClose, onRequest }) => {
  if (!food) return null;

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-20">
      <Card className="shadow-xl">
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{food.title}</h3>
              <p className="text-sm text-muted-foreground">
                {food.provider.name}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {food.provider.distance} km
            </span>
            <span className="flex items-center gap-1">
              <Timer className="w-4 h-4" />
              {getSeekerTimeRemaining(food.bestBefore)}
            </span>
          </div>

          <Button className="w-full" onClick={onRequest}>
            Request Food
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodCard;
