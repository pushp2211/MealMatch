import { motion } from 'framer-motion';

const HistoryHeader = ({ role }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
      History & Impact
    </h1>
    <p className="text-sm sm:text-base text-muted-foreground mt-1">
      {role === 'seeker'
        ? 'Track your pickups and social impact'
        : 'Track your contribution to reducing food waste'}
    </p>
  </motion.div>
);

export default HistoryHeader;
