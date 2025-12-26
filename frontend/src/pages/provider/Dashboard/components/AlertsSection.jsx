import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AlertsSection = ({ alerts }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.2 }}
  >
    <Card className="border border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <AlertCircle className="w-4 h-4 text-warning" />
          Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-0 divide-y divide-border/50">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className={`py-3 first:pt-0 last:pb-0 ${alert.urgent
                  ? 'bg-warning/5 -mx-6 px-6 first:-mt-0'
                  : ''
                }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {alert.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {alert.time}
                  </p>
                </div>
                {alert.urgent && (
                  <Badge variant="warning" className="shrink-0">
                    Urgent
                  </Badge>
                )}
              </div>
            </div>
          ))}
          {alerts.length === 0 && (
            <p className="text-sm text-muted-foreground py-2">
              No alerts at this time
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default AlertsSection;
