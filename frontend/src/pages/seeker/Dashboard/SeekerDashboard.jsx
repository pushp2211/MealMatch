import DashboardHeader from './components/DashboardHeader';
import QuickActionCard from './components/QuickActionCard';
import StatsGrid from './components/StatsGrid';
import ExpiringFoodAlert from './components/ExpiringFoodAlert';
import ActivePickupsCard from './components/ActivePickupsCard';
import PendingRequestsCard from './components/PendingRequestsCard';
import ImpactSummary from './components/ImpactSummary';

import { useSeekerDashboard } from './hooks/useSeekerDashboard';

const SeekerDashboard = () => {
  const {
    stats,
    acceptedRequests,
    pendingRequests,
    expiringFoods,
  } = useSeekerDashboard();

  return (
    <div className="bg-amber-200 h-full w-full overflow-y-auto py-10 px-[3%] sm:px-[5%] md:px-[7%] lg:px-[10%] space-y-6">
      <DashboardHeader />
      <QuickActionCard />
      <StatsGrid stats={stats} />
      <ExpiringFoodAlert foods={expiringFoods} />

      <div className="grid lg:grid-cols-2 gap-6">
        <ActivePickupsCard requests={acceptedRequests} />
        <PendingRequestsCard requests={pendingRequests} />
      </div>

      <ImpactSummary />
    </div>
  );
};

export default SeekerDashboard;
