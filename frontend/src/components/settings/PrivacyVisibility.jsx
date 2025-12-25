import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Eye } from 'lucide-react';
import { motion } from 'framer-motion';

function PrivacyVisibility({
    phoneVisibility,
    setPhoneVisibility,
    profileVisibility,
    setProfileVisibility,
}) {
    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Eye className="w-5 h-5 text-primary" />
                            Privacy & Visibility
                        </CardTitle>
                        <CardDescription>
                            Control who can see your information
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                                <Label>Phone Number Visibility</Label>
                                <p className="text-sm text-muted-foreground">
                                    When can others see your phone number
                                </p>
                            </div>
                            <Select value={phoneVisibility} onValueChange={setPhoneVisibility}>
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="after_match">After Match Approval</SelectItem>
                                    <SelectItem value="always">Always Visible</SelectItem>
                                    <SelectItem value="never">Never</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                                <Label>Profile Visibility</Label>
                                <p className="text-sm text-muted-foreground">
                                    Who can view your profile
                                </p>
                            </div>
                            <Select
                                value={profileVisibility}
                                onValueChange={setProfileVisibility}
                            >
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="everyone">Everyone</SelectItem>
                                    <SelectItem value="verified">Verified Users Only</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </>
    )
}
export default PrivacyVisibility;