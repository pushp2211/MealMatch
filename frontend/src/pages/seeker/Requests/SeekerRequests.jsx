import { motion } from 'framer-motion';
import { Tabs } from '@/components/ui/tabs';
import { toast } from 'sonner';

import { useSeekerRequests } from './hooks/useSeekerRequests';
import RequestsTabs from './components/RequestsTabs';
import PendingRequests from './components/PendingRequests';
import AcceptedRequests from './components/AcceptedRequests';
import HistoryRequests from './components/HistoryRequests';

const SeekerRequests = () => {
  const {
    pendingRequests,
    acceptedRequests,
    otherRequests,
  } = useSeekerRequests();

  const handleCancelRequest = (id) => {
    toast.success('Request cancelled');
  };

  return (
    <div className="bg-amber-200 h-full w-full overflow-y-auto py-6 sm:py-8 lg:py-10 px-4 sm:px-6 md:px-8 lg:px-[10%]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold">My Requests</h1>
        <p className="text-muted-foreground mt-1">
          Track and manage your food requests
        </p>
      </motion.div>

      <Tabs defaultValue="pending" className="space-y-4">
        <RequestsTabs
          pendingCount={pendingRequests.length}
          acceptedCount={acceptedRequests.length}
          historyCount={otherRequests.length}
        />

        <PendingRequests
          requests={pendingRequests}
          onCancel={handleCancelRequest}
        />

        <AcceptedRequests requests={acceptedRequests} />

        <HistoryRequests requests={otherRequests} />
      </Tabs>
    </div>
  );
};

export default SeekerRequests;
