import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Star,
  Shield,
} from 'lucide-react';

import { getPickupStatus } from '../utils/pickupStatus';
import PickupDetailsGrid from './PickupDetailsGrid';
import PickupLocation from './PickupLocation';
import PickupActions from './PickupActions';
import PickupNote from './PickupNote';

const ActivePickupCard = ({ pickup, index }) => {
  const status = getPickupStatus(pickup.acceptedAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="border-success/50">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-success" />
              </div>

              <div>
                <CardTitle className="text-lg">
                  {pickup.food.title}
                </CardTitle>
                <p className="text-muted-foreground">
                  {pickup.food.provider.name}
                </p>

                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Badge variant={status.color}>{status.label}</Badge>

                  {pickup.food.provider.verified && (
                    <Badge variant="outline">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 text-warning justify-end">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-medium">
                  {pickup.food.provider.rating}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {pickup.food.provider.totalDonations} donations
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <PickupDetailsGrid pickup={pickup} />
          <PickupLocation pickup={pickup} />
          <PickupActions pickup={pickup} />
          <PickupNote note={pickup.note} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ActivePickupCard;
