import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Camera, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import useUserLocation from '@/components/maps/hooks/useUserLocation';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const LocationStep = ({ formData, setFormData, mediaFiles, setMediaFiles }) => {
  const { getCurrentLocation, loading } = useUserLocation();
  const [geocoding, setGeocoding] = useState(false);

  /* ---------------- GPS HANDLER ---------------- */
  const handleGetLocation = () => {
    getCurrentLocation(({ lat, lng }) => {
      setFormData(prev => ({
        ...prev,
        useCurrentLocation: true,
        lat,
        lng,
      }));

      toast.success('Location captured successfully');
    });
  };

  /* ------------- MANUAL ADDRESS GEOCODING ------------- */
  const handleAddressBlur = async () => {
    if (!formData.address?.trim()) return;

    try {
      setGeocoding(true);

      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          formData.address
        )}.json?access_token=${MAPBOX_TOKEN}`
      );

      const data = await res.json();

      if (!data.features?.length) {
        toast.error('Unable to locate this address');
        return;
      }

      const [lng, lat] = data.features[0].center;

      setFormData(prev => ({
        ...prev,
        lat,
        lng,
        useCurrentLocation: false,
      }));

      toast.success('Address resolved');
    } catch (err) {
      console.error(err);
      toast.error('Failed to resolve address');
    } finally {
      setGeocoding(false);
    }
  };

  return (
    <>
      {/* ---------------- LOCATION SECTION ---------------- */}
      <div className="space-y-4">
        <Label>
          <MapPin className="w-4 h-4 inline mr-2" />
          Pickup Location
        </Label>

        <div className="grid grid-cols-2 gap-3">
          {/* GPS BUTTON */}
          <Button
            type="button"
            variant={formData.useCurrentLocation ? 'default' : 'outline'}
            className="h-auto py-4"
            onClick={handleGetLocation}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <MapPin className="w-5 h-5 mr-2" />
            )}
            <div className="text-left">
              <span className="block font-medium">Use GPS</span>
              <span className="text-xs opacity-80">
                Get my current location
              </span>
            </div>
          </Button>

          {/* MANUAL BUTTON */}
          <Button
            type="button"
            variant={!formData.useCurrentLocation ? 'default' : 'outline'}
            className="h-auto py-4"
            onClick={() =>
              setFormData(prev => ({
                ...prev,
                useCurrentLocation: false,
                lat: null,
                lng: null,
              }))
            }
          >
            <MapPin className="w-5 h-5 mr-2" />
            <div className="text-left">
              <span className="block font-medium">Enter Manually</span>
              <span className="text-xs opacity-80">
                Type the address
              </span>
            </div>
          </Button>
        </div>

        {/* MANUAL ADDRESS INPUT */}
        {!formData.useCurrentLocation && (
          <div className="space-y-2">
            <Input
              placeholder="Enter pickup address"
              value={formData.address}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              onBlur={handleAddressBlur}
            />
            {geocoding && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                Resolving address…
              </p>
            )}
          </div>
        )}

        {/* GPS SUCCESS STATE */}
        {formData.useCurrentLocation && formData.lat && (
          <div className="p-4 rounded-xl bg-success/10 border border-success/20">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-success" />
              <span className="font-medium text-success">
                Location captured
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ---------------- MEDIA SECTION ---------------- */}
      <div className="space-y-2 mt-6">
        <Label>
          <Camera className="w-4 h-4 inline mr-2" />
          Food Images / Videos (optional)
        </Label>

        <Input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) =>
            setMediaFiles(Array.from(e.target.files))
          }
        />

        {mediaFiles.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {mediaFiles.length} file(s) selected
          </p>
        )}
      </div>
    </>
  );
};

export default LocationStep;
