import {
  mockSeekerStats,
  mockSeekerRequests,
  mockAvailableFood,
} from '@/data/seekerMockData';

import {
  Utensils,
  Clock,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';

export const useSeekerDashboard = () => {
  const acceptedRequests = mockSeekerRequests.filter(
    (r) => r.status === 'accepted'
  );

  const pendingRequests = mockSeekerRequests.filter(
    (r) => r.status === 'pending'
  );

  const expiringFoods = mockAvailableFood.filter((f) => {
    const timeLeft = f.bestBefore.getTime() - Date.now();
    return timeLeft > 0 && timeLeft < 2 * 60 * 60 * 1000;
  });

  const stats = [
    {
      title: 'Nearby Food',
      value: mockSeekerStats.nearbyFoodCount,
      subtitle: 'Available now',
      icon: Utensils,
      variant: 'info',
    },
    {
      title: 'Pending Requests',
      value: mockSeekerStats.pendingRequests,
      subtitle: 'Awaiting response',
      icon: Clock,
      variant: 'warning',
    },
    {
      title: 'Active Pickups',
      value: mockSeekerStats.acceptedRequests,
      subtitle: 'Ready to collect',
      icon: CheckCircle,
      variant: 'success',
    },
    {
      title: 'Completed Today',
      value: mockSeekerStats.completedToday,
      subtitle: 'Successful pickups',
      icon: TrendingUp,
      variant: 'primary',
    },
  ];

  return {
    stats,
    acceptedRequests,
    pendingRequests,
    expiringFoods,
  };
};
