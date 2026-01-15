import { Card, CardContent } from "@/components/ui/card";

const SkeletonBlock = ({ className }) => (
  <div className={`animate-pulse bg-muted rounded ${className}`} />
);

const HistorySkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="space-y-3 p-4">
              <SkeletonBlock className="h-4 w-8" />
              <SkeletonBlock className="h-6 w-20" />
              <SkeletonBlock className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Social Impact Skeleton */}
      <Card>
        <CardContent className="p-6 space-y-6">
          <SkeletonBlock className="h-5 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <SkeletonBlock className="h-8 w-20" />
                <SkeletonBlock className="h-4 w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* History List Skeleton */}
      <Card>
        <CardContent className="p-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="px-6 py-4 border-b border-border space-y-2"
            >
              <SkeletonBlock className="h-4 w-40" />
              <SkeletonBlock className="h-3 w-28" />
              <SkeletonBlock className="h-3 w-32" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default HistorySkeleton;
