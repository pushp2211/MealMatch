import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

import AccountSecurity from "@/components/settings/AccountSecurity";
import Notifications from "@/components/settings/Notifications";
import OperationalPreferences from "@/components/settings/OperationalPreferences";
import PrivacyVisibility from "@/components/settings/PrivacyVisibility";
import DangerZone from "@/components/settings/DangerZone";
import { useSettings } from "./hooks/useSettings";
import SettingsSkeleton from "@/components/settings/SettingsSkeleton";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, logout, logoutAll } = useAuth();
  const navigate = useNavigate();

  const {
    loading,
    settings,
    sessions,
    updateSettings,
    changePassword,
    deleteAccount,
  } = useSettings();

  const handleLogoutCurrent = async()=>{
    await logout();
    navigate("/login", {replace: true});
  }

  const handleLogoutAll = async()=>{
    await logoutAll();
    navigate("/login", {replace: true});
  }

  if (loading || !settings) return <SettingsSkeleton/>;

  return (
    <div className="bg-amber-200 h-full w-full overflow-y-auto py-10 px-[3%] sm:px-[7%] md:px-[10%] lg:px-[15%]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl lg:text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your preferences and security
        </p>
      </motion.div>

      <div className="space-y-6">
        <AccountSecurity
          sessions={sessions}
          onLogout={handleLogoutCurrent}
          onLogoutAll={handleLogoutAll}
          onChangePassword={changePassword}
        />

        <Notifications
          notifications={settings.notifications}
          onChange={(notifications) =>
            updateSettings({ ...settings, notifications })
          }
        />

        <OperationalPreferences
          role={user.role}
          settings={settings}
          onChange={updateSettings}
        />

        <PrivacyVisibility
          privacy={settings.privacy}
          onChange={(privacy) =>
            updateSettings({ ...settings, privacy })
          }
        />

        <DangerZone onDelete={deleteAccount} />
      </div>
    </div>
  );
};

export default Settings;
