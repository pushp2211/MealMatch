import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

import { getStatusBadge } from '../utils/getStatusBadge';
import { formatTimeAgo } from '../utils/formatTimeAgo';
import { TabsContent } from '@/components/ui/tabs';

const HistoryRequests = ({ requests }) => {
  return (
    <TabsContent value="history" className="space-y-4">
      {requests.length > 0 ? (
        requests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="opacity-80">
              <CardContent className="px-4 sm:px-5">
                <div className="flex flex-row items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${
                        request.status === 'completed' ? 'bg-info/10' : 'bg-muted'
                      }`}
                    >
                      {request.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-info" />
                      ) : (
                        <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base line-clamp-1">
                        {request.food.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                        {request.food.provider.name}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-[10px] sm:text-xs text-muted-foreground flex-wrap">
                        <span>
                          {request.requestedQuantity} {request.food.quantityUnit}
                        </span>
                        <span>•</span>
                        <span>{formatTimeAgo(request.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0">
                    {getStatusBadge(request.status)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))
      ) : (
        <EmptyState />
      )}
    </TabsContent>
  );
};

const EmptyState = () => (
  <Card>
    <CardContent className="p-8 text-center">
      <XCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
      <h3 className="font-semibold mb-2">No history yet</h3>
      <p className="text-muted-foreground">
        Your past requests will appear here
      </p>
    </CardContent>
  </Card>
);

export default HistoryRequests;
