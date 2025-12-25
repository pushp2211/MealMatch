import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Edit, Save, X} from 'lucide-react';
import { toast } from 'sonner';

import ProfileHeader from '@/components/profile/ProfileHeader';
import ContactInfo from '@/components/profile/ContactInfo';
import LocationSection from '@/components/profile/LocationSection';
import AboutSection from '@/components/profile/AboutSection';
import RoleDetails from '@/components/profile/RoleDetails';
import AccountInfo from '@/components/profile/AccountInfo';

const mockUser = {
  id: '1',
  name: 'Green Plate Restaurant',
  email: 'contact@greenplate.com',
  phone: '+91 98765 43210',
  avatar: null,
  role: 'provider',
  verified: true,
  city: 'Mumbai, Maharashtra',
  bio: 'We believe in zero food waste. Every day, we share quality surplus meals with those who need them most.',
  providerType: 'restaurant',
  organizationName: 'Green Plate Hospitality Pvt. Ltd.',
  seekerType: null,
  joinedAt: new Date('2024-01-15'),
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(mockUser);

  const handleSave = () => {
    toast.success('Profile updated successfully');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(mockUser);
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
          <ProfileHeader formData={formData} setFormData={setFormData} isEditing={isEditing}/>
          {/* Contact Information */}
          <ContactInfo formData={formData} setFormData={setFormData} isEditing={isEditing}/>
          {/* Location */}
          <LocationSection formData={formData} setFormData={setFormData} isEditing={isEditing}/>
          {/* About / Bio */}
          <AboutSection formData={formData} setFormData={setFormData} isEditing={isEditing}/>
          {/* Role-Specific Fields */}
          <RoleDetails formData={formData} setFormData={setFormData} isEditing={isEditing}/>
          {/* Metadata */}
          <AccountInfo formData={formData} setFormData={setFormData} isEditing={isEditing}/> 
        </div>
      </div>
    </>
  );
};

export default Profile;
