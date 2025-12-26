import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle } from 'lucide-react';

const getActivityIcon = (type) => {
  switch (type) {
    case 'posted':
      return <Package className="w-4 h-4 text-primary" />;
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-success" />;
    case 'accepted':
      return <Clock className="w-4 h-4 text-primary" />;
    default:
      return null;
  }
};

const getActivityLabel = (type) => {
  switch (type) {
    case 'posted':
      return 'Food posted';
    case 'completed':
      return 'Pickup completed';
    case 'accepted':
      return 'Request accepted';
    default:
      return '';
  }
};

const RecentActivitySection = ({ activities }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.3 }}
  >
    <Card className="border border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Recent Activity
          </CardTitle>
          <Link
            to="/providerDashboard/history"
            className="text-sm text-primary hover:underline"
          >
            View all
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {getActivityLabel(activity.type)}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No recent activity
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default RecentActivitySection;
