import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

import { useProviderRequests } from './hooks/useProviderRequests';
import RequestsHeader from './components/RequestsHeader';
import RequestsStats from './components/RequestsStats';
import RequestsEmptyState from './components/RequestsEmptyState';
import RequestCard from './components/RequestCard';

const ProviderRequests = () => {
  const {
    loading,
    filter,
    setFilter,
    filteredRequests,
    pendingCount,
    acceptedCount,
    handleAccept,
    handleReject,
    handleComplete,
  } = useProviderRequests();

  return (
    <div className="bg-amber-200 h-full w-full overflow-y-auto py-10 px-[3%] sm:px-[7%] md:px-[10%] lg:px-[15%] space-y-6">
      <RequestsHeader />

      <RequestsStats
        pendingCount={pendingCount}
        acceptedCount={acceptedCount}
      />

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {filteredRequests.length === 0 ? (
            <RequestsEmptyState />
          ) : (
            filteredRequests.map((request, index) => (
              <RequestCard
                key={request._id} 
                request={request}
                index={index}
                onAccept={handleAccept}
                onReject={handleReject}
                onComplete={handleComplete}
              />
            ))
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default ProviderRequests;
