import { motion } from 'framer-motion';
import ActivityItem from './ActivityItem';

const ActivityGroup = ({ label, activities, groupIndex }) => (
  <div className="mb-6 last:mb-0">
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: groupIndex * 0.1 }}
      className="mb-4 relative z-10"
    >
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-xs sm:text-sm font-medium text-muted-foreground">
        {label}
      </span>
    </motion.div>

    <div className="space-y-3">
      {activities.map((activity, index) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          groupIndex={groupIndex}
          index={index}
        />
      ))}
    </div>
  </div>
);

export default ActivityGroup;
