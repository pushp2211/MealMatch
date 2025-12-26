import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const SocialImpactCard = ({
  thisMonthPeopleFed,
  thisMonthFoodSaved,
  estimatedValue
}) => (
  <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-green-500 via-green-700 to-orange-400 text-white overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-4 opacity-90">
                Your Social Impact This Month
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold">
                    {thisMonthPeopleFed}
                  </p>
                  <p className="text-sm opacity-80">
                    People Fed
                  </p>
                  <p className="text-xs opacity-60 mt-1">
                    Equivalent to feeding a small community for a day
                  </p>
                </div>

                <div>
                  <p className="text-2xl sm:text-3xl font-bold">
                    {thisMonthFoodSaved}{' '}
                    <span className="text-base font-normal">
                      servings
                    </span>
                  </p>
                  <p className="text-sm opacity-80">
                    Food Saved from Waste
                  </p>
                  <p className="text-xs opacity-60 mt-1 flex items-center gap-1">
                    <Leaf className="w-3 h-3" />
                    Prevented ~
                    {Math.round(thisMonthFoodSaved * 0.5)} kg of CO₂ emissions
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
                    Economic value of food donated
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
);

export default SocialImpactCard;
