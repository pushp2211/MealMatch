import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Search, ArrowRight } from 'lucide-react';
import { mockSeekerStats } from '@/data/seekerMockData';

const QuickActionCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="mb-6"
  >
    <Link to="/seeker/find-food">
      <Card className="bg-gradient-to-r from-info to-info/80 text-info-foreground hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <Search className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Find Food Near You</h2>
              <p className="text-info-foreground/80">
                {mockSeekerStats.nearbyFoodCount} food posts available within 5km
              </p>
            </div>
          </div>
          <ArrowRight className="w-6 h-6" />
        </CardContent>
      </Card>
    </Link>
  </motion.div>
);

export default QuickActionCard;
