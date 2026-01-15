import { useAuth } from '@/context/AuthContext';
import HistoryHeader from './components/HistoryHeader';
import HistoryStats from './components/HistoryStats';
import SocialImpactCard from './components/SocialImpactCard';
import DonationHistory from './components/DonationHistory';
import { useHistoryData } from './hooks/useHistoryData';
import HistorySkeleton from './components/HistorySkeleton';

const History = () => {
  const { user } = useAuth();
  const data = useHistoryData();

  return (
    <div className="h-full w-full overflow-y-auto space-y-6 py-6 px-4 lg:px-[10%]">
      <HistoryHeader role={user.role} />

      {data.loading ? (
        <HistorySkeleton />
      ) : (
        <>
          <HistoryStats role={user.role} {...data} />
          <SocialImpactCard role={user.role} {...data} />
          <DonationHistory role={user.role} {...data} />
        </>
      )}
    </div>
  );
};

export default History;
