import {
  // Provider icons
  Inbox,
  PlusCircle,
  CheckCircle,
  CheckCircle2,
  XCircle,
  Package,
  Clock,
  Bell,
  // Seeker icons
  Send,
  Navigation,
  Star,
  // Fallback
  AlertTriangle,
} from 'lucide-react';


// PROVIDER ACTIVITY UI MAP
const providerMap = {
  food_posted: {
    icon: PlusCircle,
    color: 'text-primary',
    bg: 'bg-primary/10',
    badge: { label: 'Posted', variant: 'success' },
  },

  request_received: {
    icon: Inbox,
    color: 'text-primary',
    bg: 'bg-primary/10',
    badge: { label: 'New Request', variant: 'info' },
  },

  request_accepted: {
    icon: CheckCircle2,
    color: 'text-primary',
    bg: 'bg-primary/10',
    badge: { label: 'Accepted', variant: 'success' },
  },

  request_rejected: {
    icon: XCircle,
    color: 'text-destructive',
    bg: 'bg-destructive/10',
    badge: { label: 'Rejected', variant: 'destructive' },
  },

  pickup_completed: {
    icon: Package,
    color: 'text-primary',
    bg: 'bg-primary/10',
    badge: { label: 'Completed', variant: 'success' },
  },

  food_expired: {
    icon: Clock,
    color: 'text-muted-foreground',
    bg: 'bg-muted',
    badge: { label: 'Expired', variant: 'secondary' },
  },

  food_cancelled: {
    icon: AlertTriangle,
    color: 'text-orange-600',
    bg: 'bg-orange-100',
    badge: { label: 'Cancelled', variant: '' },
  },

  system_alert: {
    icon: Bell,
    color: 'text-muted-foreground',
    bg: 'bg-muted-foreground/10',
    badge: { label: 'System', variant: 'accent' },
  },
};


// SEEKER ACTIVITY UI MAP
const seekerMap = {
  request_sent: {
    icon: Send,
    color: 'text-primary',
    bg: 'bg-primary/10',
    badge: { label: 'Sent', variant: 'info' },
  },

  request_accepted: {
    icon: CheckCircle2,
    color: 'text-primary',
    bg: 'bg-primary/10',
    badge: { label: 'Accepted', variant: 'success' },
  },

  request_rejected: {
    icon: XCircle,
    color: 'text-destructive',
    bg: 'bg-destructive/10',
    badge: { label: 'Rejected', variant: 'destructive' },
  },

  pickup_started: {
    icon: Navigation,
    color: 'text-primary',
    bg: 'bg-primary/10',
    badge: { label: 'In Progress', variant: 'info' },
  },

  pickup_completed: {
    icon: Package,
    color: 'text-primary',
    bg: 'bg-primary/10',
    badge: { label: 'Completed', variant: 'success' },
  },

  rating_pending: {
    icon: Star,
    color: 'text-primary',
    bg: 'bg-primary/10',
    badge: { label: 'Action Needed', variant: 'warning' },
  },

  request_expired: {
    icon: Clock,
    color: 'text-muted-foreground',
    bg: 'bg-muted',
    badge: { label: 'Expired', variant: 'secondary' },
  },

  system_alert: {
    icon: Bell,
    color: 'text-muted-foreground',
    bg: 'bg-muted-foreground/10',
    badge: { label: 'System', variant: 'accent' },
  },
};

// PUBLIC API (NON-BREAKING)
export const getActivityIcon = (type, role = 'provider') => {
  const map = role === 'seeker' ? seekerMap : providerMap;
  return map[type] || {
    icon: AlertTriangle,
    color: 'text-muted-foreground',
    bg: 'bg-muted',
  };
};

export const getActivityBadge = (type, role = 'provider') => {
  const map = role === 'seeker' ? seekerMap : providerMap;
  return map[type]?.badge || {
    label: 'Activity',
    variant: 'secondary',
  };
};
