import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, Utensils } from 'lucide-react';

const HistoryStats = ({
    role,
    totalDonations,
    totalFood,
    totalPeople,
    activeDays,
}) => {
    return (
        <motion.div
            className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
        >
            <Card className="h-full bg-green-700/10 border-green-700/20">
                <CardContent className="px-4">
                    <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-green-700 mb-2" />
                    <p className="text-xl sm:text-2xl font-bold">
                        {totalDonations}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {role === 'provider' ? 'Total Donations' : 'Total Pickups'}
                    </p>
                </CardContent>
            </Card>

            <Card className="h-full bg-green-600/5 border-green-600/20">
                <CardContent className="px-4">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mb-2" />
                    <p className="text-xl sm:text-2xl font-bold">
                        {totalFood}{' '}
                        <span className="text-sm font-normal">
                            servings
                        </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {role === 'provider' ? 'Food Donated' : 'Food Received'}
                    </p>
                </CardContent>
            </Card>

            <Card className="h-full bg-orange-700/10 border-orange-700/20">
                <CardContent className="px-4">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-orange-700 mb-2" />
                    <p className="text-xl sm:text-2xl font-bold">
                        {totalPeople}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {role === 'provider' ? 'People Fed' : 'People Served'}
                    </p>
                </CardContent>
            </Card>

            <Card className="h-full bg-muted/50 border-border">
            <CardContent className="px-4">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mb-2" />
                <p className="text-xl sm:text-2xl font-bold">
                    {activeDays}
                </p>
                <p className="text-sm text-muted-foreground">
                    Active Days
                </p>
            </CardContent>
        </Card>
        </motion.div>
    );
};

export default HistoryStats;
