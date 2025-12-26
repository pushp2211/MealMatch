import HistoryHeader from './components/HistoryHeader';
import HistoryStats from './components/HistoryStats';
import SocialImpactCard from './components/SocialImpactCard';
import DonationHistory from './components/DonationHistory';
import { useHistoryData } from './hooks/useHistoryData';

const History = () => {
  const data = useHistoryData();

  return (
    <div className="bg-amber-200 min-h-screen w-full overflow-y-auto space-y-6 py-6 sm:py-8 lg:py-10 px-4 sm:px-6 md:px-8 lg:px-[10%]">
      <HistoryHeader />
      <HistoryStats {...data} />
      <SocialImpactCard {...data} />
      <DonationHistory
        donations={data.visibleDonations}
        formatDate={data.formatDate}
        handleLoadMore={data.handleLoadMore}
        hasMore={data.hasMore}
        isAtMax={data.isAtMax}
      />
    </div>
  );
};

export default History;
