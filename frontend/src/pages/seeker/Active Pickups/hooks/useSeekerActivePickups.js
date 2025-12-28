import { toast } from 'sonner';
import { mockSeekerRequests } from '@/data/seekerMockData';

export const useSeekerActivePickups = () => {
  const activePickups = mockSeekerRequests.filter(
    (r) => r.status === 'accepted'
  );

  const markCompleted = (id) => {
    // backend mutation
    toast.success('Pickup marked as completed!');
  };

  const reportIssue = (id) => {
    // open modal / backend
    toast.info('Issue report dialog would open');
  };

  return {
    activePickups,
    markCompleted,
    reportIssue,
  };
};
