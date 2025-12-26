import {
  PlusCircle,
  Bell,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Package,
  Shield
} from 'lucide-react';

export const getActivityIcon = (type) => {
  switch (type) {
    case 'food_posted':
      return { icon: PlusCircle, color: 'text-primary', bg: 'bg-primary/10' };
    case 'request_received':
      return { icon: Bell, color: 'text-amber-600', bg: 'bg-amber-100' };
    case 'request_accepted':
      return { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' };
    case 'request_rejected':
      return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' };
    case 'pickup_completed':
      return { icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-100' };
    case 'food_expired':
      return { icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted' };
    case 'food_cancelled':
      return { icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-100' };
    case 'system_alert':
      return { icon: Shield, color: 'text-blue-600', bg: 'bg-blue-100' };
    default:
      return { icon: Bell, color: 'text-muted-foreground', bg: 'bg-muted' };
  }
};

export const getActivityBadge = (type) => {
  switch (type) {
    case 'food_posted':
      return { label: 'Posted', variant: 'default' };
    case 'request_received':
      return { label: 'Request', variant: 'warning' };
    case 'request_accepted':
      return { label: 'Accepted', variant: 'success' };
    case 'request_rejected':
      return { label: 'Declined', variant: 'destructive' };
    case 'pickup_completed':
      return { label: 'Completed', variant: 'success' };
    case 'food_expired':
      return { label: 'Expired', variant: 'secondary' };
    case 'food_cancelled':
      return { label: 'Cancelled', variant: 'outline' };
    case 'system_alert':
      return { label: 'System', variant: 'accent' };
    default:
      return { label: 'Activity', variant: 'secondary' };
  }
};
