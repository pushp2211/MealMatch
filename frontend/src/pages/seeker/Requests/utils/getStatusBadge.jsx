import { Badge } from '@/components/ui/badge';

const commonClasses = "whitespace-nowrap px-3 py-1 rounded-full";

export const getStatusBadge = (status) => {
  switch (status) {
    case 'pending':
      return <Badge variant="warning" className={commonClasses}>Pending</Badge>;
    case 'accepted':
      return <Badge variant="success" className={commonClasses}>Accepted</Badge>;
    case 'rejected':
      return <Badge variant="destructive" className={commonClasses}>Rejected</Badge>;
    case 'completed':
      return <Badge variant="info" className={commonClasses}>Completed</Badge>;
    case 'expired':
      return <Badge variant="secondary" className={commonClasses}>Expired</Badge>;
    case 'cancelled':
      return <Badge variant="secondary" className={commonClasses}>Cancelled</Badge>;
    default:
      return <Badge className={commonClasses}>{status}</Badge>;
  }
};
