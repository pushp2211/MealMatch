import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DashboardHeader = () => (
  <motion.div
    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div>
      <h1 className="text-2xl font-bold text-foreground">Welcome back!</h1>
      <p className="text-muted-foreground text-sm">
        Here's your impact today
      </p>
    </div>
    <Link to="/providerDashboard/post-food">
      <Button variant="destructive" className="gap-2">
        <Plus className="w-4 h-4" />
        Post Food
      </Button>
    </Link>
  </motion.div>
);

export default DashboardHeader;
