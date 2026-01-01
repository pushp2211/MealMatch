import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, ShieldCheck, Star } from "lucide-react";

const SeekerList = ({ seekers, selectedId, onSelect }) => {
  return (
    <div className="flex-1 lg:flex-none w-full lg:w-80 border-t lg:border-t-0 lg:border-l bg-card overflow-y-auto z-10 h-[40vh] lg:h-auto order-2 lg:order-none">
      <div className="p-4 space-y-3">
        <h3 className="font-semibold flex items-center gap-2">
          <Users className="w-4 h-4" />
          Nearby Seekers
        </h3>

        {seekers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No seekers found in this area. <br/> Try increasing the radius.
          </div>
        ) : (
          seekers.map((seeker) => {
            const isSelected = selectedId === seeker.id;
            const hasActivePickup = seeker.requestStatus === 'accepted';

            return (
              <Card
                key={seeker.id}
                onClick={() => onSelect(seeker)}
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "border-primary ring-1 ring-primary/20 bg-primary/5 shadow-md"
                    : "hover:bg-muted/50"
                }`}
              >
                <CardContent className="px-4 py-3">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium truncate pr-2 text-sm">{seeker.name}</h4>
                    {seeker.verified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded capitalize">
                        {seeker.type}
                    </span>
                    <span className="flex items-center text-xs font-medium text-amber-500">
                        <Star className="w-3 h-3 mr-0.5 fill-amber-500" />
                        {seeker.rating}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {seeker.distance} km
                    </span>
                    
                    {hasActivePickup && (
                       <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium text-[10px] border border-green-200">
                         Active Request
                       </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SeekerList;