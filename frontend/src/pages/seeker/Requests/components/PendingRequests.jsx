import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Clock, Shield, X, Loader2, Star } from 'lucide-react';

import { getStatusBadge } from '../utils/getStatusBadge';
import { formatTimeAgo } from '../utils/formatTimeAgo';
import { TabsContent } from '@/components/ui/tabs';

const PendingRequests = ({ requests, onCancel, cancellingIds }) => {
  return (
    <TabsContent value="pending" className="space-y-4">
      {requests.length > 0 ? (
        requests.map((request, index) => {
          const isCancelling = cancellingIds.has(request._id);
          // Safe access to populated fields
          const food = request.foodPost || {};
          const provider = request.provider || {};

          return (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="px-4 sm:px-5">
                  {/* Header */}
                  <div className="flex flex-row items-start justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-warning" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base line-clamp-1">
                          {food.title || "Unknown Item"}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                          {provider.name || "Unknown Provider"}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      {getStatusBadge(request.status)}
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-4">
                    <Info 
                      label="Requested" 
                      value={`${request.quantityRequested} ${food.quantity?.unit || 'units'}`} 
                    />
                    <Info 
                      label="Distance" 
                      value={request.distanceKm ? `${request.distanceKm} km` : 'N/A'} 
                    />
                    <Info 
                      label="Expires In" 
                      value={getSeekerTimeRemaining(food.availability?.bestBefore)} 
                      highlight 
                    />
                    <Info 
                      label="Time" 
                      value={formatTimeAgo(request.createdAt)} 
                    />
                  </div>

                  {/* Note */}
                  {request.note && (
                    <div className="p-2 rounded-lg bg-muted/30 mb-3">
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Your note</p>
                      <p className="text-xs sm:text-sm">{request.note}</p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      {/* Note: Provider rating is not currently populated in controller, hiding if undefined */}
                      {provider.isVerified && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto hover:bg-destructive/10 hover:text-destructive"
                      disabled={isCancelling}
                      onClick={() => onCancel(request._id)}
                    >
                      {isCancelling ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                          Cancelling
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })
      ) : (
        <EmptyState icon={Clock} title="No pending requests" />
      )}
    </TabsContent>
  );
};

const getSeekerTimeRemaining = (dateString) => {
  if (!dateString) return 'N/A';
  const diff = new Date(dateString).getTime() - Date.now();
  if (diff < 0) return 'Expired';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

const Info = ({ label, value, highlight }) => (
  <div className="p-2 rounded-lg bg-muted/50">
    <p className="text-[10px] sm:text-xs text-muted-foreground">{label}</p>
    <p className={`font-medium text-sm ${highlight ? 'text-warning' : ''}`}>
      {value}
    </p>
  </div>
);

const EmptyState = ({ icon: Icon, title }) => (
  <Card>
    <CardContent className="p-8 text-center">
      <Icon className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">Browse available food to make a request</p>
    </CardContent>
  </Card>
);

export default PendingRequests;