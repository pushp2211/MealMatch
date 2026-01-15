import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const SocialImpactCard = ({
  role,
  peopleFed,
  foodSaved,
  estimatedValue,
}) => {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-gradient-to-r from-green-500 via-green-700 to-orange-400 text-white overflow-hidden">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 opacity-90">
            Your Social Impact This Month
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-2xl sm:text-3xl font-bold">
                {peopleFed}
              </p>
              <p className="text-sm opacity-80">
                {role == 'provider' ? 'People Fed' : 'People Served'}
              </p>
              <p className="text-xs opacity-60 mt-1">
                {role == 'provider' ?
                  'Equivalent to feeding a small community for a day'
                  : 'Making a difference in your community'
                }
              </p>
            </div>

            <div>
              <p className="text-2xl sm:text-3xl font-bold">
                {foodSaved}{' '}
                <span className="text-base font-normal">
                  servings
                </span>
              </p>
              <p className="text-sm opacity-80">
                {role == 'provider' ? 'Food Saved from Waste' : 'Food Rescued'}
              </p>
              <p className="text-xs opacity-60 mt-1 flex items-center gap-1">
                <Leaf className="w-3 h-3" />
                Prevented ~
                {Math.round(foodSaved * 0.5)} kg of CO₂ emissions
              </p>
            </div>

            <div>
              <p className="text-2xl sm:text-3xl font-bold">
                ₹{estimatedValue.toLocaleString()}
              </p>
              <p className="text-sm opacity-80">
                Estimated Value
              </p>
              <p className="text-xs opacity-60 mt-1">
                {role == 'provider' ? 
                  'Economic value of food donated' 
                  : 'Economic value of food rescued'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SocialImpactCard;
