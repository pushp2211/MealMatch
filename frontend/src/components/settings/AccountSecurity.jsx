import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, LogOut, Key, Monitor, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

function AccountSecurity({mockSessions}) {
    const handleLogout = () => toast.info('Logged out successfully');
    const handleLogoutAll = () => toast.info('Logged out from all devices');
    const handleChangePassword = () => toast.info('Password change email sent');

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-primary" />
                            Account & Security
                        </CardTitle>
                        <CardDescription>
                            Manage your account security and sessions
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b">
                            <div>
                                <p className="font-medium">Password</p>
                                <p className="text-sm text-muted-foreground">
                                    Change your account password
                                </p>
                            </div>
                            <Button variant="outline" onClick={handleChangePassword}>
                                <Key className="w-4 h-4 mr-2" />
                                Change Password
                            </Button>
                        </div>

                        <div className="space-y-3">
                            <p className="font-medium">Active Sessions</p>
                            <div className="space-y-2">
                                {mockSessions.map((session) => (
                                    <div
                                        key={session.id}
                                        className="flex items-center justify-between p-3 border rounded-lg bg-muted/30"
                                    >
                                        <div className="flex items-center gap-3">
                                            {session.device.includes('iPhone') ||
                                                session.device.includes('Android') ? (
                                                <Smartphone className="w-4 h-4 text-muted-foreground" />
                                            ) : (
                                                <Monitor className="w-4 h-4 text-muted-foreground" />
                                            )}
                                            <div>
                                                <p className="text-sm font-medium">{session.device}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {session.current
                                                        ? 'Current session'
                                                        : `Last active ${session.lastActive.toLocaleDateString()}`}
                                                </p>
                                            </div>
                                        </div>
                                        {session.current && <Badge variant="success">Active</Badge>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <Button variant="outline" className="flex-1" onClick={handleLogout}>
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                            <Button
                                variant="destructive"
                                className="flex-1"
                                onClick={handleLogoutAll}
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout All Devices
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </>
    )
}

export default AccountSecurity;