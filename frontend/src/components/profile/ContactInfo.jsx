import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

function ContactInfo({ formData, setFormData, isEditing }) {
    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Mail className="w-5 h-5 text-primary" />
                            Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Email Address</Label>
                                <div className="flex items-center gap-2">
                                    <Input value={formData.email} disabled className="flex-1 bg-muted/50" />
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => toast.info('Email change flow')}
                                    >
                                        Change
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Email cannot be edited directly
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label>Phone Number</Label>
                                {isEditing ? (
                                    <Input
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 h-10 px-3 border rounded-md bg-muted/30">
                                        <Phone className="w-4 h-4 text-muted-foreground" />
                                        <span>{formData.phone}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </>
    )
}

export default ContactInfo;