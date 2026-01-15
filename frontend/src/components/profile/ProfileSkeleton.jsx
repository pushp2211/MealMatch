import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Reusing the header helper for consistency
const CardHeaderSkeleton = () => (
  <div className="flex items-start gap-3 mb-6">
    <Skeleton className="h-5 w-5 rounded mt-0.5" /> {/* Icon placeholder */}
    <Skeleton className="h-5 w-48" /> {/* Section Title */}
  </div>
);

// Helper for the "Label + Input Field" look seen in Contact/Location cards
const FieldSkeleton = ({ className }) => (
  <div className={`space-y-2 ${className}`}>
    <Skeleton className="h-4 w-24" /> {/* Label */}
    <Skeleton className="h-10 w-full rounded-md bg-muted/50" /> {/* Input Box simulation */}
  </div>
);

const IdentityCardSkeleton = () => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center gap-6">
        {/* Large Avatar Placeholder */}
        <Skeleton className="h-24 w-24 rounded-xl" />
        
        <div className="space-y-3">
          {/* Name */}
          <Skeleton className="h-8 w-64" />
          
          {/* Badges (Role, Verified status) */}
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ContactCardSkeleton = () => (
  <Card>
    <CardContent className="p-6">
      <CardHeaderSkeleton />
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Email Field with "Change" button simulation */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1 rounded-md bg-muted/50" />
            <Skeleton className="h-10 w-20 rounded-md" /> {/* Change Button */}
          </div>
          <Skeleton className="h-3 w-40 mt-1" /> {/* Helper text */}
        </div>

        {/* Phone Number Field */}
        <FieldSkeleton />
      </div>
    </CardContent>
  </Card>
);

const LocationCardSkeleton = () => (
  <Card>
    <CardContent className="p-6">
      <CardHeaderSkeleton />
      <FieldSkeleton />
      <Skeleton className="h-3 w-64 mt-3" /> {/* "Your exact address..." note */}
    </CardContent>
  </Card>
);

const AboutCardSkeleton = () => (
  <Card>
    <CardContent className="p-6">
      <CardHeaderSkeleton />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </CardContent>
  </Card>
);

const DetailsCardSkeleton = () => (
  <Card>
    <CardContent className="p-6">
      <CardHeaderSkeleton />
      <div className="space-y-6">
        <FieldSkeleton />
        <FieldSkeleton />
      </div>
    </CardContent>
  </Card>
);

const AccountInfoSkeleton = () => (
  <Card>
    <CardContent className="p-6">
      <CardHeaderSkeleton />
      
      <div className="grid md:grid-cols-2 gap-6 mt-4">
        {/* Joined Date */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="space-y-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        {/* Verification Status */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="space-y-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ProfileSkeleton = () => {
  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto p-1">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" /> {/* "Profile" Title */}
          <Skeleton className="h-4 w-64" /> {/* Subtitle */}
        </div>
        <Skeleton className="h-10 w-28 rounded-md" /> {/* "Edit Profile" Button */}
      </div>

      <IdentityCardSkeleton />
      <ContactCardSkeleton />
      <LocationCardSkeleton />
      <AboutCardSkeleton />
      <DetailsCardSkeleton />
      <AccountInfoSkeleton />
    </div>
  );
};

export default ProfileSkeleton;