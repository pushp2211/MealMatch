import { useState } from 'react';
import { motion } from 'framer-motion';
import AccountSecurity from '@/components/settings/AccountSecurity';
import Notifications from '@/components/settings/Notifications';
import OperationalPreferences from '@/components/settings/OperationalPreferences';
import PrivacyVisibility from '@/components/settings/PrivacyVisibility';
import DangerZone from '@/components/settings/DangerZone';

const mockUserRole = 'provider';

const mockSessions = [
    { id: '1', device: 'Chrome on Windows', lastActive: new Date(), current: true },
    { id: '2', device: 'Safari on iPhone', lastActive: new Date(Date.now() - 86400000) },
    { id: '3', device: 'Firefox on MacOS', lastActive: new Date(Date.now() - 172800000) },
];

const Settings = () => {
    const [notifications, setNotifications] = useState({ email: false, push: true });
    const [radius, setRadius] = useState(10);
    const [autoAccept, setAutoAccept] = useState(false);
    const [autoExpire, setAutoExpire] = useState(true);
    const [phoneVisibility, setPhoneVisibility] = useState('after_match');
    const [profileVisibility, setProfileVisibility] = useState('everyone');
    const [deleteConfirm, setDeleteConfirm] = useState('');

    return (
        <>
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
                    {/* Account & Security */}
                    <AccountSecurity mockSessions={mockSessions} />

                    {/* Notification Preferences */}
                    <Notifications notifications={notifications} setNotifications={setNotifications} />

                    {/* Operational Preferences */}
                    <OperationalPreferences
                        role={mockUserRole}
                        radius={radius}
                        setRadius={setRadius}
                        autoAccept={autoAccept}
                        setAutoAccept={setAutoAccept}
                        autoExpire={autoExpire}
                        setAutoExpire={setAutoExpire}
                    />

                    {/* Privacy & Visibility */}
                    <PrivacyVisibility
                        phoneVisibility={phoneVisibility}
                        setPhoneVisibility={setPhoneVisibility}
                        profileVisibility={profileVisibility}
                        setProfileVisibility={setProfileVisibility}
                    />

                    {/* Danger Zone */}
                    <DangerZone
                        deleteConfirm={deleteConfirm}
                        setDeleteConfirm={setDeleteConfirm}
                    />
                </div>
            </div>
        </>
    );
};

export default Settings;
