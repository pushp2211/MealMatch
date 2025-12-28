import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Utensils } from 'lucide-react';

const PendingRequestsCard = ({ requests }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
  >
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-warning" />
          Pending Requests
        </CardTitle>
        <Link to="/seekerDashboard/requests">
          <Button variant="ghost" size="sm">View All</Button>
        </Link>
      </CardHeader>
      <CardContent>
        {requests.length > 0 ? (
          <div className="space-y-3">
            {requests.slice(0, 2).map((request) => (
              <div key={request.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{request.food.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {request.food.provider.name}
                    </p>
                  </div>
                  <Badge variant="warning">Pending</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Utensils className="w-4 h-4" />
                    {request.requestedQuantity} {request.food.quantityUnit}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {request.food.provider.distance} km
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No pending requests</p>
            <p className="text-sm">Browse food to make a request</p>
          </div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

export default PendingRequestsCard;
