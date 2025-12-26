import { motion } from 'framer-motion';

const RequestsHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h1 className="text-2xl lg:text-3xl font-bold">Pickup Requests</h1>
    <p className="text-muted-foreground mt-1">
      Manage incoming pickup requests from seekers
    </p>
  </motion.div>
);

export default RequestsHeader;
