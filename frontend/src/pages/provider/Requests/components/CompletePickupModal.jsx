import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CompletePickupModal = ({ open, onClose, onConfirm, loading }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = () => {
    if (!otp || otp.length < 4) return;
    onConfirm(otp);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Pickup OTP</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Enter 4-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            autoFocus
          />

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            Confirm Completion
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompletePickupModal;
