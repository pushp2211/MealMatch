import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Timer } from 'lucide-react';
import { getSeekerTimeRemaining } from '@/data/seekerMockData';

const ExpiringFoodAlert = ({ foods }) => {
  if (!foods.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-6"
    >
      <Card className="border-warning/50 bg-warning-light">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-warning">
            <AlertTriangle className="w-5 h-5" />
            Expiring Soon
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {foods.slice(0, 3).map((food) => (
            <div
              key={food.id}
              className="flex items-center justify-between p-3 bg-background rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Timer className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="font-medium">{food.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {food.provider.name}
                  </p>
                </div>
              </div>
              <Badge variant="warning">
                {getSeekerTimeRemaining(food.bestBefore)} left
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExpiringFoodAlert;
