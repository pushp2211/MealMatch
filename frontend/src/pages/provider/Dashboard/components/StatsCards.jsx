import { Card, CardContent } from '@/components/ui/card';
import { Package, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsCards = ({ stats }) => (
  <motion.div
    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.1 }}
  >
    {/* Active Food Posts */}
    <Card className="h-full border border-border/50">
      <CardContent className="px-5">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xs text-primary font-medium">
            +1 today
          </span>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold text-foreground">
            {stats.activePosts}
          </p>
          <p className="text-sm text-muted-foreground">
            Active Food Posts
          </p>
        </div>
      </CardContent>
    </Card>

    {/* Pending Pickups */}
    <Card className="border h-full border-border/50">
      <CardContent className="px-5">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold text-foreground">
            {stats.pendingRequests}
          </p>
          <p className="text-sm text-muted-foreground">
            Pending Pickups
          </p>
        </div>
      </CardContent>
    </Card>

    {/* Completed Donations */}
    <Card className="border h-full border-border/50">
      <CardContent className="px-5">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xs text-primary font-medium">
            +12 this week
          </span>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold text-foreground">
            {stats.totalDonations}
          </p>
          <p className="text-sm text-muted-foreground">
            Completed Donations
          </p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default StatsCards;
