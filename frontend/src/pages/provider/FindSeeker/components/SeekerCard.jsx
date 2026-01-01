import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, ShieldCheck, Building2, ExternalLink } from "lucide-react";

const SeekerCard = ({ seeker, onClose }) => {
  if (!seeker) return null;

  const canCall = seeker.requestStatus === 'accepted';

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <Card className="shadow-2xl border-t-4 border-t-primary bg-card/95 backdrop-blur-sm">
        <CardContent className="p-5 space-y-4">
          
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                {seeker.name}
                {seeker.verified && (
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                )}
              </h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Building2 className="w-3 h-3" />
                {seeker.type?.toUpperCase() || "NGO"}
              </p>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={onClose}>
              ✕
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="flex items-center justify-between text-sm py-2 border-y border-dashed">
             <div className="flex flex-col items-center px-4 border-r w-1/3">
                <span className="font-bold text-lg">{seeker.rating || "New"}</span>
                <span className="text-[10px] text-muted-foreground uppercase">Rating</span>
             </div>
             <div className="flex flex-col items-center px-4 border-r w-1/3">
                <span className="font-bold text-lg">{seeker.totalPickups || 0}</span>
                <span className="text-[10px] text-muted-foreground uppercase">Pickups</span>
             </div>
             <div className="flex flex-col items-center px-4 w-1/3">
                <span className="font-bold text-lg">{seeker.distance}</span>
                <span className="text-[10px] text-muted-foreground uppercase">km Away</span>
             </div>
          </div>

          {/* Contact Logic */}
          <div className="space-y-2">
            {canCall ? (
                <div className="bg-green-50 p-3 rounded-lg border border-green-100 space-y-2">
                    <p className="text-xs text-green-800 font-medium flex justify-between">
                        <span>Pickup Request Accepted</span>
                        <span className="text-green-600">Active</span>
                    </p>
                    <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white h-9" 
                        onClick={() => window.open(`tel:${seeker.phone}`)}
                    >
                        <Phone className="w-3 h-3 mr-2" />
                        Call {seeker.phone}
                    </Button>
                </div>
            ) : (
                <div className="bg-muted/30 p-3 rounded-lg border border-muted space-y-2">
                     <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Contact Details</span>
                        <Badge variant="outline" className="text-[10px] text-muted-foreground">Locked</Badge>
                     </div>
                     <Button variant="secondary" className="w-full h-9 opacity-50 cursor-not-allowed" disabled>
                        <Phone className="w-3 h-3 mr-2" />
                        Accept Request to Call
                    </Button>
                </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex gap-2">
             <Button variant="outline" className="flex-1 text-xs" onClick={onClose}>
                Close
             </Button>
             <Button variant="ghost" className="flex-1 text-xs">
                View Profile <ExternalLink className="w-3 h-3 ml-1"/>
             </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default SeekerCard;