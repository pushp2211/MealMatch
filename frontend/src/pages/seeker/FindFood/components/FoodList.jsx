import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Timer } from "lucide-react";
import { getTimeRemaining } from "../utils/getTimeRemaining.util.js";

const FoodList = ({ foods, selectedId, onSelect }) => {
  return (
    <div className="flex-1 lg:flex-none w-full lg:w-72 xl:w-80 border-t lg:border-t-0 lg:border-l bg-card overflow-y-auto z-10">
      <div className="p-4 space-y-3">
        <h3 className="font-semibold">Nearby Food</h3>

        {foods.map((food) => {
          const isSelected = selectedId === food.id;
          
          const bestBefore = food.availability?.bestBefore;
          const providerName = food.provider?.name || "Unknown Provider";
          // Use the distance calculated in useFindFoodMap
          const distance = food.distance ? `${food.distance} km` : "Nearby";
          return (
            <Card
              key={food.id}
              onClick={() => onSelect(food)}
              className={`cursor-pointer transition ${
                isSelected
                  ? "border-info ring-2 ring-info/30"
                  : "hover:bg-muted"
              }`}
            >
              <CardContent className="px-4">
                <h4 className="font-medium truncate">{food.title}</h4>
                <p className="text-sm text-muted-foreground truncate">
                  {providerName}
                </p>

                <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Timer className="w-3 h-3" />
                    {getTimeRemaining(bestBefore)}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FoodList;
