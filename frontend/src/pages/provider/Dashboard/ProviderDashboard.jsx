import DashboardHeader from './components/DashboardHeader';
import StatsCards from './components/StatsCards';
import AlertsSection from './components/AlertsSection';
import RecentActivitySection from './components/RecentActivitySection';

import { useProviderDashboard } from './hooks/useProviderDashboard';
import {
  generateAlerts,
  generateRecentActivity
} from './utils/providerDashboard.utils';

const ProviderDashboard = () => {
  const {
    foodPosts,
    pickupRequests,
    donationHistory,
    stats
  } = useProviderDashboard();

  const alerts = generateAlerts({ foodPosts, pickupRequests });
  const recentActivity = generateRecentActivity({
    foodPosts,
    pickupRequests,
    donationHistory
  });

  return (
    <div className="bg-amber-200 h-full w-full overflow-y-auto py-10 px-[3%] sm:px-[5%] md:px-[7%] lg:px-[10%] space-y-6">
      <DashboardHeader />
      <StatsCards stats={stats} />
      <AlertsSection alerts={alerts} />
      <RecentActivitySection activities={recentActivity} />
    </div>
  );
};

export default ProviderDashboard;
