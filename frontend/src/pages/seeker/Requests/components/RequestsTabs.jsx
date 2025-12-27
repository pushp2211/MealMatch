import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const RequestsTabs = ({ pendingCount, acceptedCount, historyCount }) => {
  return (
    <TabsList className="grid grid-cols-3 w-full max-w-md bg-muted/20 p-1">
      <TabsTrigger value="pending" className="flex items-center justify-center gap-2 text-xs sm:text-sm">
        <Clock className="w-4 h-4 hidden sm:block" />
        Pending ({pendingCount})
      </TabsTrigger>
      <TabsTrigger value="accepted" className="flex items-center justify-center gap-2 text-xs sm:text-sm">
        <CheckCircle className="w-4 h-4 hidden sm:block" />
        Accepted ({acceptedCount})
      </TabsTrigger>
      <TabsTrigger value="history" className="flex items-center justify-center gap-2 text-xs sm:text-sm">
        <XCircle className="w-4 h-4 hidden sm:block" />
        History ({historyCount})
      </TabsTrigger>
    </TabsList>
  );
};

export default RequestsTabs;
