import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

function LocationSection({ formData, setFormData, isEditing }) {
    const hasLocation =
        Array.isArray(formData?.location?.coordinates) &&
        formData.location.coordinates.length === 2;

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            Location
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label>City / Area</Label>

                            <div className="flex items-center gap-2 h-10 px-3 border rounded-md bg-muted/30">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">
                                    {hasLocation ? "Location set" : "Location not set"}
                                </span>
                            </div>

                            <p className="text-xs text-muted-foreground">
                                Your exact address is never shown publicly
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </>
    )
}

export default LocationSection;