import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ChangePasswordDialog = ({ open, onOpenChange, onSubmit }) => {
    const [current, setCurrent] = useState("");
    const [next, setNext] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!current || !next || !confirm) {
            toast.error("All fields are required");
            return;
        }

        if (next !== confirm) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            await onSubmit({
                currentPassword: current,
                newPassword: next,
            });
            toast.success("Password changed successfully");
            onOpenChange(false);
            setCurrent("");
            setNext("");
            setConfirm("");
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to change password";

            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label>Current Password</Label>
                        <Input
                            type="password"
                            value={current}
                            onChange={(e) => setCurrent(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>New Password</Label>
                        <Input
                            type="password"
                            value={next}
                            onChange={(e) => setNext(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Confirm New Password</Label>
                        <Input
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="destructive"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ChangePasswordDialog;
