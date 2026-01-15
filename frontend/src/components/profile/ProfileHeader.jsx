import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Camera, Shield, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

function ProfileHeader({ formData, setFormData, isEditing }) {
    const fileRef = useRef(null);

    const handleAvatarChange = (file) => {
        if (!file) return;
        // preview immediately
        const previewUrl = URL.createObjectURL(file);

        setFormData({
            ...formData,
            avatarFile: file, 
            avatar: previewUrl,
        });
    };

    const avatarSrc = formData.avatarPreview || (typeof formData.avatar === "string" ? formData.avatar : null);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold overflow-hidden">
                                {avatarSrc ? (
                                    <img
                                        src={avatarSrc}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    formData.name.charAt(0)
                                )}
                            </div>

                            {isEditing && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => fileRef.current.click()}
                                        className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                    >
                                        <Camera className="w-6 h-6 text-white" />
                                    </button>

                                    <input
                                        ref={fileRef}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => handleAvatarChange(e.target.files[0])}
                                    />
                                </>
                            )}
                        </div>

                        <div className="flex-1 text-center sm:text-left">
                            {isEditing ? (
                                <Input
                                    value={formData.name || ""}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="text-xl font-bold mb-2 max-w-xs"
                                />
                            ) : (
                                <h2 className="text-xl font-bold">{formData.name}</h2>
                            )}

                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                                <Badge
                                    variant={formData.role === 'provider' ? 'default' : 'info'}
                                    className="capitalize"
                                >
                                    <User className="w-3 h-3 mr-1" />
                                    {formData.role}
                                </Badge>

                                {formData.isVerified && (
                                    <Badge variant="success">
                                        <Shield className="w-3 h-3 mr-1" />
                                        Verified
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default ProfileHeader;