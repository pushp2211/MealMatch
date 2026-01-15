import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

function OperationalPreferences({ role, settings, onChange }) {
  const isProvider = role === "provider";

  const prefs = isProvider
    ? settings.providerPreferences
    : settings.seekerPreferences;

  const update = (updates) => {
    onChange({
      ...settings,
      [isProvider ? "providerPreferences" : "seekerPreferences"]: {
        ...prefs,
        ...updates,
      },
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            {isProvider ? "Provider Preferences" : "Seeker Preferences"}
          </CardTitle>
          <CardDescription>
            Configure your operational settings
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between">
              <Label>
                {isProvider ? "Pickup Radius" : "Search Radius"}
              </Label>
              <span className="text-sm font-medium text-primary">
                {prefs.pickupRadiusKm || prefs.searchRadiusKm} km
              </span>
            </div>

            <Slider
              value={[
                prefs.pickupRadiusKm || prefs.searchRadiusKm,
              ]}
              min={1}
              max={25}
              step={1}
              onValueChange={([v]) =>
                update(
                  isProvider
                    ? { pickupRadiusKm: v }
                    : { searchRadiusKm: v }
                )
              }
            />
          </div>

          {isProvider && (
            <>
              <div className="flex justify-between items-center border-t pt-4">
                <Label>Auto-Accept Requests</Label>
                <Switch
                  checked={prefs.autoAcceptRequests}
                  onCheckedChange={(v) =>
                    update({ autoAcceptRequests: v })
                  }
                />
              </div>

              <div className="flex justify-between items-center">
                <Label>Auto-Expire Posts</Label>
                <Switch
                  checked={prefs.autoExpireFoodPosts}
                  onCheckedChange={(v) =>
                    update({ autoExpireFoodPosts: v })
                  }
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default OperationalPreferences;
