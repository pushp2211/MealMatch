import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { getVariantStyles, getIconStyles } from '../utils/statStyles';

const StatsGrid = ({ stats }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    {stats.map((stat, index) => (
      <motion.div
        key={stat.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 + index * 0.05 }}
      >
        <Card className={`${getVariantStyles(stat.variant)} border h-full`}>
          <CardContent className="px-4">
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${getIconStyles(
                  stat.variant
                )}`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm font-medium">{stat.title}</p>
            <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </div>
);

export default StatsGrid;
