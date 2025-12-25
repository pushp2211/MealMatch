import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell } from 'lucide-react';
import { motion } from 'framer-motion';

function Notifications({notifications, setNotifications}) {
    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="w-5 h-5 text-primary" />
                            Notifications
                        </CardTitle>
                        <CardDescription>
                            Choose how you want to be notified
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive updates via email
                                </p>
                            </div>
                            <Switch
                                checked={notifications.email}
                                onCheckedChange={(v) =>
                                    setNotifications({ ...notifications, email: v })
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Push Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Browser push notifications
                                </p>
                            </div>
                            <Switch
                                checked={notifications.push}
                                onCheckedChange={(v) =>
                                    setNotifications({ ...notifications, push: v })
                                }
                            />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </>
    )
}

export default Notifications;