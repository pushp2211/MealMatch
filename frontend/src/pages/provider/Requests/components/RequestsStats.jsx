import { Card } from '@/components/ui/card';
import { Clock, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const RequestsStats = ({ pendingCount, acceptedCount }) => (
  <motion.div className="flex flex-col sm:flex-row gap-4">
    <Card className="flex-1 p-4">
      <div className="flex items-center gap-3">
        <Clock className="w-5 h-5 text-accent" />
        <div>
          <p className="text-2xl font-bold">{pendingCount}</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </div>
      </div>
    </Card>

    <Card className="flex-1 p-4">
      <div className="flex items-center gap-3">
        <Check className="w-5 h-5 text-success" />
        <div>
          <p className="text-2xl font-bold">{acceptedCount}</p>
          <p className="text-xs text-muted-foreground">Accepted</p>
        </div>
      </div>
    </Card>
  </motion.div>
);

export default RequestsStats;
