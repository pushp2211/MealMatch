import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import {
  Clock,
  MapPin,
  Check,
  X,
  Phone,
  Navigation,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { getSeekerIcon } from '../utils/requests.utils';

const RequestCard = ({
  request,
  index,
  onAccept,
  onReject,
  onComplete,
}) => {
  // Safe access to nested objects from backend population
  const seeker = request.seeker || {};
  const foodPost = request.foodPost || {};
  
  // Use MongoDB _id
  const requestId = request._id;

  const SeekerIcon = getSeekerIcon(seeker.seekerType || 'individual');
  const isAccepted = request.status === 'accepted';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card variant={isAccepted ? 'highlight' : 'default'} className="overflow-hidden">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <SeekerIcon className="w-6 h-6 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold">{seeker.name || "Unknown User"}</h3>
                {seeker.isVerified && (
                  <Badge variant="info" className="text-[10px]">
                    Verified
                  </Badge>
                )}
                <Badge variant="muted" className="text-[10px] capitalize">
                  {seeker.seekerType || 'User'}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mt-0.5">
                Requesting:{' '}
                <span className="font-medium">{foodPost.title || "Food Item"}</span>
              </p>

              <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {request.distanceKm ? `${request.distanceKm} km` : 'Nearby'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {request.etaMinutes ? `~${request.etaMinutes} min` : '~15 min'}
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <Badge variant="accent" className="mb-1">
                {request.quantityRequested} {foodPost.quantity?.unit || 'units'}
              </Badge>
              <p className="text-xs text-muted-foreground">
                {request.createdAt 
                  ? formatDistanceToNow(new Date(request.createdAt), { addSuffix: true }) 
                  : 'Just now'}
              </p>
            </div>
          </div>

          {/* Actions */}
          {request.status === 'pending' && (
            <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t">
              <Button
                className="flex-1 bg-green-500 text-white"
                onClick={() => onAccept(requestId)}
              >
                <Check className="w-4 h-4 mr-2" />
                Accept Request
              </Button>
              <Button
                className="flex-1 bg-red-200 text-red-700"
                onClick={() => onReject(requestId)}
              >
                <X className="w-4 h-4 mr-2" />
                Decline
              </Button>
            </div>
          )}

          {request.status === 'accepted' && (
            <div className="mt-4 pt-4 border-t space-y-3">
              {seeker.phone && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={`tel:${seeker.phone}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call: {seeker.phone}
                  </a>
                </Button>
              )}

              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-green-500 text-white"
                  onClick={() => onComplete(requestId)}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Mark Completed
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RequestCard;
