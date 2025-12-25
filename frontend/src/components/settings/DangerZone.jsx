import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Label } from '../ui/label';

function DangerZone({ deleteConfirm, setDeleteConfirm }) {
    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <Card className="border-destructive/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive">
                            <AlertTriangle className="w-5 h-5" />
                            Danger Zone
                        </CardTitle>
                        <CardDescription>
                            Irreversible account actions
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <p className="font-medium">Delete Account</p>
                                <p className="text-sm text-muted-foreground">
                                    Permanently delete your account and all data
                                </p>
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="destructive">
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete Account
                                    </Button>
                                </DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className="flex items-center gap-2 text-destructive">
                                            <AlertTriangle className="w-5 h-5" />
                                            Delete Account
                                        </DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently delete
                                            your account, all your posts, and remove your data from our
                                            servers.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="py-4">
                                        <Label>Type "DELETE" to confirm</Label>
                                        <Input
                                            value={deleteConfirm}
                                            onChange={(e) => setDeleteConfirm(e.target.value)}
                                            placeholder="DELETE"
                                            className="mt-2"
                                        />
                                    </div>

                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            onClick={() => setDeleteConfirm('')}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            disabled={deleteConfirm !== 'DELETE'}
                                            onClick={() =>
                                                toast.error('Account deletion is disabled in demo')
                                            }
                                        >
                                            Delete Forever
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </>
    )
}

export default DangerZone;