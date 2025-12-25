import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Camera, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

const LocationStep = ({ formData, setFormData }) => {
    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData(prev => ({ ...prev, useCurrentLocation: true }));
                    toast.success('Location captured successfully!');
                },
                () => {
                    toast.error('Unable to get location. Please enter manually.');
                }
            );
        }
    };

    return (
        <>
            <div className="space-y-4">
                <Label>
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Pickup Location
                </Label>

                <div className="grid grid-cols-2 gap-3">
                    <Button
                        type="button"
                        variant={formData.useCurrentLocation ? 'default' : 'outline'}
                        className="h-auto py-4"
                        onClick={handleGetLocation}
                    >
                        <MapPin className="w-5 h-5 mr-2" />
                        <div className="text-left">
                            <span className="block font-medium">Use GPS</span>
                            <span className="text-xs opacity-80">Get my current location</span>
                        </div>
                    </Button>
                    <Button
                        type="button"
                        variant={!formData.useCurrentLocation && formData.address ? 'default' : 'outline'}
                        className="h-auto py-4"
                        onClick={() => setFormData(prev => ({ ...prev, useCurrentLocation: false }))}
                    >
                        <MapPin className="w-5 h-5 mr-2" />
                        <div className="text-left">
                            <span className="block font-medium">Enter Manually</span>
                            <span className="text-xs opacity-80">Type the address</span>
                        </div>
                    </Button>
                </div>

                {formData.useCurrentLocation && (
                    <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                        <div className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-success" />
                            <span className="font-medium text-success">Location captured!</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            Your current location will be used for pickup.
                        </p>
                    </div>
                )}

                {!formData.useCurrentLocation && (
                    <div className="space-y-2">
                        <Input
                            placeholder="Search for a location..."
                            value={formData.address}
                            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        />
                        <p className="text-xs text-muted-foreground">
                            Start typing to search for your address
                        </p>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <Label>
                    <Camera className="w-4 h-4 inline mr-2" />
                    Food Images (optional)
                </Label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
                    <Camera className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                        Click to upload or drag & drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG up to 5MB
                    </p>
                </div>
            </div>
        </>
    );
};

export default LocationStep;
