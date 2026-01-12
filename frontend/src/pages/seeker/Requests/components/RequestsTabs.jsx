import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, CheckCircle } from 'lucide-react';

const RequestsTabs = ({ pendingCount, acceptedCount }) => {
  return (
    <TabsList className="grid grid-cols-2 w-full max-w-xs bg-muted/20 p-1">
      <TabsTrigger 
        value="pending" 
        className="flex items-center justify-center gap-2 text-xs sm:text-sm"
      >
        <Clock className="w-4 h-4 hidden sm:block" />
        Pending ({pendingCount})
      </TabsTrigger>
      <TabsTrigger 
        value="accepted" 
        className="flex items-center justify-center gap-2 text-xs sm:text-sm"
      >
        <CheckCircle className="w-4 h-4 hidden sm:block" />
        Accepted ({acceptedCount})
      </TabsTrigger>
    </TabsList>
  );
};

export default RequestsTabs;