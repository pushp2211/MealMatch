import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

function OperationalPreferences({
    role,
    radius,
    setRadius,
    autoAccept,
    setAutoAccept,
    autoExpire,
    setAutoExpire,
}) {
    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            {role === 'provider'
                                ? 'Provider Preferences'
                                : 'Seeker Preferences'}
                        </CardTitle>
                        <CardDescription>
                            Configure your operational settings
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label>
                                    {role === 'provider'
                                        ? 'Pickup Radius'
                                        : 'Search Radius'}
                                </Label>
                                <span className="text-sm font-medium text-primary">
                                    {radius} km
                                </span>
                            </div>

                            <Slider
                                value={[radius]}
                                onValueChange={(v) => setRadius(v[0])}
                                min={1}
                                max={25}
                                step={1}
                            />

                            <p className="text-xs text-muted-foreground">
                                {role === 'provider'
                                    ? 'Maximum distance seekers can be from your location'
                                    : 'Maximum distance to search for food posts'}
                            </p>
                        </div>

                        {role === 'provider' && (
                            <>
                                <div className="flex items-center justify-between pt-2 border-t">
                                    <div>
                                        <Label>Auto-Accept Requests</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Automatically accept pickup requests from verified seekers
                                        </p>
                                    </div>
                                    <Switch checked={autoAccept} onCheckedChange={setAutoAccept} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Auto-Expire Posts</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Automatically expire posts after best-before time
                                        </p>
                                    </div>
                                    <Switch checked={autoExpire} onCheckedChange={setAutoExpire} />
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </>
    )
}

export default OperationalPreferences;