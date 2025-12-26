import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Heart, CheckCircle } from 'lucide-react';

const DonationHistory = ({
    donations,
    formatDate,
    handleLoadMore,
    hasMore,
    isAtMax
}) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
    >
        <Card>
            <CardHeader className="pb-0 border-b-1">
                <CardTitle className="text-base sm:text-lg font-semibold">
                    Donation History
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
                <div className="divide-y divide-border">
                    {donations.map((donation, index) => (
                        <motion.div
                            key={donation.id}
                            className="px-4 sm:px-6 py-4 hover:bg-muted/30 transition-colors"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.05 * index
                            }}
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <h4 className="font-medium truncate">
                                            {donation.foodPost.title}
                                        </h4>
                                        <Badge
                                            variant="outline"
                                            className="bg-success/10 text-success border-success/30 text-xs flex items-center gap-1"
                                        >
                                            <CheckCircle className="w-3 h-3" />
                                            Completed
                                        </Badge>
                                    </div>

                                    <p className="text-sm text-muted-foreground">
                                        {donation.quantityDonated} servings
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Picked up by{' '}
                                        <span className="font-medium text-foreground">
                                            {donation.seeker.name}
                                        </span>
                                    </p>
                                </div>

                                <div className="text-left sm:text-right flex-shrink-0">
                                    <p className="text-sm text-muted-foreground">
                                        {formatDate(donation.completedAt)}
                                    </p>
                                    <p className="text-sm text-primary flex items-center gap-1 sm:justify-end mt-1">
                                        <Heart className="w-3 h-3" />
                                        {donation.peopleHelped} people fed
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Load More / End Message */}
                <div className="p-4 sm:p-6 text-center border-t border-border">
                    {hasMore ? (
                        <Button
                            variant="link"
                            onClick={handleLoadMore}
                            className="text-primary"
                        >
                            Load More
                        </Button>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            {isAtMax 
                                ? 'Showing last 30 donations. For older records, please contact support.'
                                : "You've reached the end of your donation history."}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

export default DonationHistory;
