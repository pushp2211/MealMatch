import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const RequestsEmptyState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-12"
  >
    <Clock className="w-8 h-8 mx-auto text-muted-foreground mb-4" />
    <h3 className="font-semibold text-lg">No requests</h3>
  </motion.div>
);

export default RequestsEmptyState;
