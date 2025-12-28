import { motion } from 'framer-motion';

const ActivityHeader = ({ role }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <h1 className="text-xl sm:text-2xl font-bold text-foreground">
      Activity Feed
    </h1>
    <p className="text-sm sm:text-base text-muted-foreground mt-1">
      {role === 'seeker'
        ? 'Track all your food requests and activities in real time'
        : 'Track all your activities in real time'}
    </p>
  </motion.div>
);

export default ActivityHeader;
