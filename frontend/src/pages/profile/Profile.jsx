import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Edit, Save, X } from 'lucide-react';

import ProfileHeader from '@/components/profile/ProfileHeader';
import ContactInfo from '@/components/profile/ContactInfo';
import LocationSection from '@/components/profile/LocationSection';
import AboutSection from '@/components/profile/AboutSection';
import RoleDetails from '@/components/profile/RoleDetails';
import AccountInfo from '@/components/profile/AccountInfo';
import { useProfile } from './hooks/useProfile';
import HistorySkeleton from '../history/components/HistorySkeleton';
import { useAuth } from '@/context/AuthContext';


const Profile = () => {
  const { profile, saveProfile, loading } = useProfile();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [draftProfile, setDraftProfile] = useState(null);

  useEffect(() => {
    if (profile) {
      setDraftProfile({ 
        ...profile, 
        role: user.role,
        avatarPreview: null
      });
    }
  }, [profile, user.role]);

  if (loading || !draftProfile) return <HistorySkeleton />;

  const handleSave = async () => {
    await saveProfile(draftProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraftProfile({
      ...profile,
      role: user.role,
      avatarPreview: null,
    });
    setIsEditing(false);
  };

  return (
    <>
      <div className="bg-amber-200 h-full w-full overflow-y-auto py-10 px-[3%] sm:px-[7%] md:px-[10%] lg:px-[15%]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your identity information</p>
          </div>

          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleCancel} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          )}
        </motion.div>

        <div className="space-y-6">
          {/* Profile Header */}
          <ProfileHeader formData={draftProfile} setFormData={setDraftProfile} isEditing={isEditing} />
          {/* Contact Information */}
          <ContactInfo formData={draftProfile} setFormData={setDraftProfile} isEditing={isEditing} />
          {/* Location */}
          <LocationSection formData={draftProfile} setFormData={setDraftProfile} isEditing={isEditing} />
          {/* About / Bio */}
          <AboutSection formData={draftProfile} setFormData={setDraftProfile} isEditing={isEditing} />
          {/* Role-Specific Fields */}
          <RoleDetails formData={draftProfile} setFormData={setDraftProfile} isEditing={isEditing} />
          {/* Metadata */}
          <AccountInfo formData={draftProfile} setFormData={setDraftProfile} isEditing={isEditing} />
        </div>
      </div>
    </>
  );
};

export default Profile;
