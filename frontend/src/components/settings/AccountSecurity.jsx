import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  LogOut,
  Key,
  Monitor,
  Smartphone,
} from "lucide-react";
import { motion } from "framer-motion";

import ChangePasswordDialog from "@/components/settings/ChangePasswordDialog";

function AccountSecurity({
  sessions,
  onLogout,
  onLogoutAll,
  onChangePassword,
}) {
  const [openChangePassword, setOpenChangePassword] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
          {/* Password */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b">
            <div>
              <p className="font-medium">Password</p>
              <p className="text-sm text-muted-foreground">
                Change your account password
              </p>
            </div>

            {/* IMPORTANT: open dialog, not API call */}
            <Button
              variant="outline"
              onClick={() => setOpenChangePassword(true)}
            >
              <Key className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          </div>

          {/* Sessions */}
          <div className="space-y-3">
            <p className="font-medium">Active Sessions</p>

            <div className="space-y-2">
              {sessions.map((s) => {
                const isMobile =
                  s.device.toLowerCase().includes("iphone") ||
                  s.device.toLowerCase().includes("android");

                return (
                  <div
                    key={s.id}
                    className="flex items-center justify-between p-3 border rounded-lg bg-muted/30"
                  >
                    <div className="flex gap-3 items-start">
                      {isMobile ? (
                        <Smartphone className="w-4 h-4 mt-1 text-muted-foreground" />
                      ) : (
                        <Monitor className="w-4 h-4 mt-1 text-muted-foreground" />
                      )}

                      <div className="space-y-0.5">
                        <p className="text-sm font-medium break-all">
                          {s.device}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {s.current
                            ? "Current session"
                            : `Last active: ${new Date(
                                s.lastActive
                              ).toLocaleString()}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          IP: {s.ip || "Unknown"} · Role: {s.role}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Logged in:{" "}
                          {new Date(s.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {s.current && (
                      <Badge variant="success">Active</Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>

            <Button
              variant="destructive"
              className="flex-1"
              onClick={onLogoutAll}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout All Devices
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 🔑 THIS WAS MISSING */}
      <ChangePasswordDialog
        open={openChangePassword}
        onOpenChange={setOpenChangePassword}
        onSubmit={onChangePassword}
      />
    </motion.div>
  );
}

export default AccountSecurity;
