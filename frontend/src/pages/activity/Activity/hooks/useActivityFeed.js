import { useMemo } from 'react';
import { mockActivityFeed } from '@/data/mockData';
import { mockSeekerActivityFeed } from '@/data/seekerMockData';
import { prepareActivityFeed } from '../utils/activityGrouping';

export const useActivityFeed = (role) => {
  return useMemo(() => {
    const feed =
      role === 'seeker'
        ? mockSeekerActivityFeed
        : mockActivityFeed;

    return prepareActivityFeed(feed);
  }, [role]);
};
