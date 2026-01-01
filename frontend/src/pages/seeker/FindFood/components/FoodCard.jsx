import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Timer, Star, ShieldCheck } from "lucide-react";
import { getSeekerTimeRemaining } from "@/data/seekerMockData";

const FoodCard = ({ food, onClose, onRequest, hasActivePickup = false }) => {
  const [quantity, setQuantity] = useState(
    Math.min(10, food?.quantity || 1)
  );
  const [note, setNote] = useState("");

  if (!food) return null;
  const maxQty = food.quantity || 1;

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-20">
      <Card className="shadow-2xl">
        <CardContent className="p-5 space-y-4">
          {/* HEADER */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{food.title}</h3>
              <p className="text-sm text-muted-foreground">
                from {food.provider.name}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>

          {/* META GRID */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-muted-foreground">Quantity</p>
              <p className="font-medium">
                {food.quantity} {food.quantityUnit}
              </p>
            </div>

            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-muted-foreground">Freshness</p>
              <Badge variant="secondary">{food.freshness}</Badge>
            </div>

            <div className="rounded-lg bg-muted/40 p-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {food.provider.distance} km
            </div>

            <div className="rounded-lg bg-muted/40 p-3 flex items-center gap-2">
              <Timer className="w-4 h-4" />
              {getSeekerTimeRemaining(food.bestBefore)}
            </div>
          </div>

          {/* DESCRIPTION */}
          {food.description && (
            <p className="text-sm text-muted-foreground">
              {food.description}
            </p>
          )}

          {/* PROVIDER */}
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="font-medium">{food.provider.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {food.provider.type}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              {food.provider.rating}
              {food.provider.verified && (
                <Badge className="ml-2 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </Badge>
              )}
            </div>
          </div>

          {/* REQUEST QUANTITY */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Request Quantity</span>
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                −
              </Button>
              <span className="font-medium">
                {quantity} {food.quantityUnit}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setQuantity(q => Math.min(maxQty, q + 1))}
              >
                +
              </Button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Maximum available: {maxQty} {food.quantityUnit}
          </p>

          {/* NOTE */}
          <textarea
            className="w-full rounded-md border p-2 text-sm"
            placeholder="Note to provider (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          {/* ACTIVE PICKUP GUARD */}
          {hasActivePickup && (
            <div className="rounded-md bg-yellow-50 text-yellow-800 text-sm p-3">
              You already have an active pickup.  
              Please make sure you can manage multiple pickups before requesting.
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                onRequest({
                  food,
                  quantity,
                  note,
                })
              }
            >
              {hasActivePickup ? "Request Anyway" : "Request Food"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodCard;
