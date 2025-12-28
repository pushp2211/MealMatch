import { motion } from 'framer-motion';

const DashboardHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-6"
  >
    <h1 className="text-2xl lg:text-3xl font-bold">Welcome back!</h1>
    <p className="text-muted-foreground mt-1">
      Find and collect surplus food in your area
    </p>
  </motion.div>
);

export default DashboardHeader;
