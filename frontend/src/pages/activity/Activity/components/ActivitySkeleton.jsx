import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ActivitySkeletonItem = () => (
  <div className="flex gap-3 sm:gap-4">
    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-muted animate-pulse" />

    <div className="flex-1 space-y-2">
      <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
      <div className="h-3 w-2/3 bg-muted rounded animate-pulse" />
    </div>
  </div>
);

const ActivitySkeletonGroup = () => (
  <div className="space-y-4">
    <div className="h-5 w-24 bg-muted rounded-full animate-pulse" />
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <ActivitySkeletonItem key={i} />
      ))}
    </div>
  </div>
);

const ActivitySkeleton = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="h-5 w-40 bg-muted rounded animate-pulse" />
      </CardHeader>

      <CardContent className="space-y-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <ActivitySkeletonGroup key={i} />
        ))}
      </CardContent>
    </Card>
  );
};

export default ActivitySkeleton;
