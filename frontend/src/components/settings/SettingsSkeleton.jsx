import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Helper for the "Icon + Title + Subtitle" header found in each card
const CardHeaderSkeleton = () => (
  <div className="flex items-start gap-3 mb-6">
    <Skeleton className="h-5 w-5 rounded mt-0.5" /> {/* Icon placeholder */}
    <div className="space-y-2">
      <Skeleton className="h-5 w-40" /> {/* Section Title */}
      <Skeleton className="h-4 w-64" /> {/* Section Description */}
    </div>
  </div>
);

// Helper for a standard row: Text on left, Action/Input on right
const RowSkeleton = ({ hasBorder = true }) => (
  <div className={`flex items-center justify-between py-4 ${hasBorder ? 'border-b' : ''}`}>
    <div className="space-y-2">
      <Skeleton className="h-4 w-32" /> {/* Label */}
      <Skeleton className="h-3 w-48" /> {/* Description */}
    </div>
    <Skeleton className="h-8 w-12 rounded-full" /> {/* Toggle/Action placeholder */}
  </div>
);

const SecurityCardSkeleton = () => (
  <Card>
    <CardContent className="p-6">
      <CardHeaderSkeleton />
      
      {/* Password Row */}
      <div className="flex items-center justify-between py-4 border-b border-border/50">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-40" />
        </div>
        <Skeleton className="h-9 w-36" /> {/* Change Password Button */}
      </div>

      {/* Active Sessions Section */}
      <div className="mt-6 space-y-4">
        <Skeleton className="h-4 w-28" /> {/* "Active Sessions" label */}
        
        {/* Session Items */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
            <Skeleton className="h-8 w-8 rounded" /> {/* Device Icon */}
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            {i === 1 && <Skeleton className="h-6 w-16 rounded-full" />} {/* "Active" badge */}
          </div>
        ))}

        {/* Logout Buttons */}
        <div className="flex gap-4 mt-2 pt-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const PreferencesCardSkeleton = () => (
  <Card>
    <CardContent className="p-6">
      <CardHeaderSkeleton />
      <div className="space-y-1">
        <RowSkeleton />
        <RowSkeleton />
        {/* Slider Row Simulation */}
        <div className="py-4">
           <div className="flex justify-between mb-4">
             <Skeleton className="h-4 w-24" />
             <Skeleton className="h-4 w-10" />
           </div>
           <Skeleton className="h-2 w-full rounded-full" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const DangerZoneSkeleton = () => (
  <Card className="border-red-100">
    <CardContent className="p-6">
      <CardHeaderSkeleton />
      <div className="flex items-center justify-between mt-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-56" />
        </div>
        <Skeleton className="h-9 w-32 bg-destructive/10" />
      </div>
    </CardContent>
  </Card>
);

const SettingsSkeleton = () => {
  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto p-1">
      {/* Page Header */}
      <div className="space-y-2 mb-8">
        <Skeleton className="h-8 w-48" /> {/* Main Title */}
        <Skeleton className="h-4 w-72" /> {/* Subtitle */}
      </div>

      {/* Account & Security */}
      <SecurityCardSkeleton />

      {/* Notifications */}
      <PreferencesCardSkeleton />

      {/* Preferences (Reusing the layout as it's similar) */}
      <PreferencesCardSkeleton />

      {/* Danger Zone */}
      <DangerZoneSkeleton />
    </div>
  );
};

export default SettingsSkeleton;