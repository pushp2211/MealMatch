import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import ActivityGroup from './ActivityGroup';

const ActivityTimeline = ({ groupedActivities }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-base sm:text-lg flex items-center gap-2">
        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        Recent Activity
      </CardTitle>
    </CardHeader>

    <CardContent>
      <div className="relative">
        <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-px bg-border" />

        {Object.entries(groupedActivities).map(
          ([label, activities], index) => (
            <ActivityGroup
              key={label}
              label={label}
              activities={activities}
              groupIndex={index}
            />
          )
        )}
      </div>
    </CardContent>
  </Card>
);

export default ActivityTimeline;
