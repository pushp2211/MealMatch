import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import {
  Clock,
  MapPin,
  Star,
  Check,
  X,
  Phone,
  Navigation,
  AlertTriangle,
} from 'lucide-react';
import { formatTimeAgo } from '@/data/mockData';
import { getSeekerIcon } from '../utils/requests.utils';

const RequestCard = ({
  request,
  index,
  onAccept,
  onReject,
  onComplete,
  onNoShow,
}) => {
  const SeekerIcon = getSeekerIcon(request.seeker.type);
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
                <h3 className="font-semibold">{request.seeker.name}</h3>
                {request.seeker.verified && (
                  <Badge variant="info" className="text-[10px]">
                    Verified
                  </Badge>
                )}
                <Badge variant="muted" className="text-[10px] capitalize">
                  {request.seeker.type}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mt-0.5">
                Requesting:{' '}
                <span className="font-medium">{request.foodPost.title}</span>
              </p>

              <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  {request.seeker.rating}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {request.distance} km
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  ~{request.eta} min
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <Badge variant="accent" className="mb-1">
                {request.requestedQuantity} {request.foodPost.quantityUnit}
              </Badge>
              <p className="text-xs text-muted-foreground">
                {formatTimeAgo(request.createdAt)}
              </p>
            </div>
          </div>

          {/* Actions */}
          {request.status === 'pending' && (
            <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t">
              <Button
                className="flex-1 bg-green-500 text-white"
                onClick={() => onAccept(request.id)}
              >
                <Check className="w-4 h-4 mr-2" />
                Accept Request
              </Button>
              <Button
                className="flex-1 bg-red-200 text-red-700"
                onClick={() => onReject(request.id)}
              >
                <X className="w-4 h-4 mr-2" />
                Decline
              </Button>
            </div>
          )}

          {request.status === 'accepted' && (
            <div className="mt-4 pt-4 border-t space-y-3">
              {request.seeker.phone && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={`tel:${request.seeker.phone}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call: {request.seeker.phone}
                  </a>
                </Button>
              )}

              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-green-500 text-white"
                  onClick={() => onComplete(request.id)}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Mark Completed
                </Button>
                <Button
                  size="icon"
                  className="bg-red-200 text-red-700"
                  onClick={() => onNoShow(request.id)}
                >
                  <AlertTriangle className="w-4 h-4" />
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
