import { mockSeekerRequests } from '@/data/seekerMockData';

export const useSeekerRequests = () => {
  const pendingRequests = mockSeekerRequests.filter(
    (r) => r.status === 'pending'
  );

  const acceptedRequests = mockSeekerRequests.filter(
    (r) => r.status === 'accepted'
  );

  const otherRequests = mockSeekerRequests.filter((r) =>
    ['rejected', 'expired', 'cancelled', 'completed'].includes(r.status)
  );

  return {
    pendingRequests,
    acceptedRequests,
    otherRequests,
  };
};
