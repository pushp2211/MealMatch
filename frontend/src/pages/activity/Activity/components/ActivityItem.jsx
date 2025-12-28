import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { formatTimeAgo } from '@/data/mockData';
import { getActivityIcon, getActivityBadge } from '../utils/activityIcons';
import { useAuth } from '@/context/AuthContext';

const ActivityItem = ({ activity, groupIndex, index }) => {
  const { user } = useAuth();
  const iconInfo = getActivityIcon(activity.type, user.role);
  const badgeInfo = getActivityBadge(activity.type, user.role);

  const IconComponent = iconInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: groupIndex * 0.1 + index * 0.05 }}
      className="relative flex gap-3 sm:gap-4 pl-1 sm:pl-2"
    >
      <div className={`relative z-10 flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full ${iconInfo.bg} flex items-center justify-center`}>
        <IconComponent className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${iconInfo.color}`} />
      </div>

      <div className="flex-1 min-w-0 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-foreground text-sm sm:text-base">
                {activity.title}
              </span>
              <Badge variant={badgeInfo.variant} className="text-xs">
                {badgeInfo.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
              {activity.description}
            </p>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {formatTimeAgo(activity.timestamp)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityItem;
