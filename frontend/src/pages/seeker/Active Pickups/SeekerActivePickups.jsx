import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

import ActivePickupCard from './components/ActivePickupCard';
import { useSeekerActivePickups } from './hooks/useSeekerActivePickups';

const SeekerActivePickups = () => {
  const { activePickups } = useSeekerActivePickups();

  return (
    <div className="min-h-screen w-full overflow-y-auto space-y-6 py-6 px-4 lg:px-[10%]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl lg:text-3xl font-bold">Active Pickups</h1>
        <p className="text-muted-foreground mt-1">
          Manage your accepted food pickups
        </p>
      </motion.div>

      {activePickups.length > 0 ? (
        <div className="space-y-4">
          {activePickups.map((pickup, index) => (
            <ActivePickupCard
              key={pickup.id}
              pickup={pickup}
              index={index}
            />
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                No Active Pickups
              </h3>
              <p className="text-muted-foreground mb-6">
                You don't have any accepted pickups at the moment.
                <br />
                Browse available food to make a request.
              </p>
              <Button asChild>
                <a href="/seeker/find-food">Find Food</a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default SeekerActivePickups;
