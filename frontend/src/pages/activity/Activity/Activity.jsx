import { useAuth } from '@/context/AuthContext';
import ActivityHeader from './components/ActivityHeader';
import ActivityTimeline from './components/ActivityTimeline';
import { useActivityFeed } from './hooks/useActivityFeed';
import ActivitySkeleton from './components/ActivitySkeleton';

const Activity = () => {
  const { user } = useAuth();
  const groupedActivities = useActivityFeed();

  const isLoading =
    !groupedActivities || Object.keys(groupedActivities).length === 0;

  return (
    <div className="bg-amber-200 h-full w-full overflow-y-auto py-10 px-[3%] sm:px-[7%] md:px-[10%] lg:px-[15%] space-y-6">
      <ActivityHeader role={user.role} />
      {isLoading ? (
        <ActivitySkeleton />
      ) : (
        <ActivityTimeline groupedActivities={groupedActivities} />
      )}
    </div>
  );
};

export default Activity;
