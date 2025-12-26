import ActivityHeader from './components/ActivityHeader';
import ActivityTimeline from './components/ActivityTimeline';
import { useActivityFeed } from './hooks/useActivityFeed';

const ProviderActivity = () => {
  const groupedActivities = useActivityFeed();

  return (
    <div className="bg-amber-200 h-full w-full overflow-y-auto py-10 px-[3%] sm:px-[7%] md:px-[10%] lg:px-[15%] space-y-6">
      <ActivityHeader />
      <ActivityTimeline groupedActivities={groupedActivities} />
    </div>
  );
};

export default ProviderActivity;
