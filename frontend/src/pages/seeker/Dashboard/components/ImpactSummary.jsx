import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Utensils, Users, Star } from 'lucide-react';
import { mockSeekerStats } from '@/data/seekerMockData';

const ImpactSummary = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.45 }}
    className="mt-6"
  >
    <Card className="bg-gradient-to-r from-primary/10 to-info/10">
      <CardContent className="px-6">
        <h3 className="font-semibold mb-4">Your Impact This Month</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10">
              <Utensils className="w-6 h-6 text-primary" />
            </div>
            <p className="text-2xl font-bold">
              {mockSeekerStats.totalPickups}
            </p>
            <p className="text-sm text-muted-foreground">
              Total Pickups
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-info/10">
              <Users className="w-6 h-6 text-info" />
            </div>
            <p className="text-2xl font-bold">
              {mockSeekerStats.mealsReceived.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              Meals Received
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-warning/10">
              <Star className="w-6 h-6 text-warning" />
            </div>
            <p className="text-2xl font-bold">4.9</p>
            <p className="text-sm text-muted-foreground">
              Your Rating
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default ImpactSummary;
