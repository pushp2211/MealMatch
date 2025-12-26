import { useMemo } from 'react';
import { mockActivityFeed } from '@/data/mockData';
import { prepareActivityFeed } from '../utils/activityGrouping';

export const useActivityFeed = () => {
  return useMemo(() => {
    return prepareActivityFeed(mockActivityFeed);
  }, []);
};
