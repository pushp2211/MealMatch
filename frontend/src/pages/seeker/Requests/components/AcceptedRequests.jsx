import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin } from 'lucide-react';

import { getStatusBadge } from '../utils/getStatusBadge';
import { getSeekerTimeRemaining } from '@/data/seekerMockData';
import { TabsContent } from '@/components/ui/tabs';

const AcceptedRequests = ({ requests }) => {
  return (
    <TabsContent value="accepted" className="space-y-4">
      {requests.length > 0 ? (
        requests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-success/50 bg-success-light/30">
              <CardContent className="px-4 sm:px-5">
                <div className="flex flex-row items-start justify-between gap-3 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-success/10 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base line-clamp-1">
                        {request.food.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                        {request.food.provider.name}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    {getStatusBadge(request.status)}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-4">
                  <Info label="Quantity" value={`${request.requestedQuantity} ${request.food.quantityUnit}`} />
                  <Info label="Distance" value={`${request.food.provider.distance} km`} />
                  <Info label="ETA" value={`${request.eta || 15} min`} />
                  <Info label="Pickup By" value={getSeekerTimeRemaining(request.food.availableTo)} highlight />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1">
                    <MapPin className="w-4 h-4 mr-2" />
                    Navigate
                  </Button>
                  {request.providerPhone && (
                    <Button variant="outline">Call Provider</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))
      ) : (
        <EmptyState icon={CheckCircle} title="No accepted requests" />
      )}
    </TabsContent>
  );
};

const Info = ({ label, value, highlight }) => (
  <div className="p-2 rounded-lg bg-background">
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
      <p className="text-muted-foreground">Your accepted requests will appear here</p>
    </CardContent>
  </Card>
);

export default AcceptedRequests;
