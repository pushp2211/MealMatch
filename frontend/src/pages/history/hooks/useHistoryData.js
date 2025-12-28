import { useState, useMemo } from 'react';
import { mockDonationHistory } from '@/data/mockData';
import { mockSeekerHistory } from '@/data/seekerMockData';
import { ITEMS_PER_PAGE } from '../constants';
import {
  getLimitedHistory,
  calculateTotals,
  calculateThisMonthImpact,
  formatDate,
} from '../utils/history.utils';

export const useHistoryData = (role = 'provider') => {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  const sourceData =
    role === 'seeker'
      ? mockSeekerHistory
      : mockDonationHistory;

  const allItems = useMemo(
    () => getLimitedHistory(sourceData),
    [sourceData]
  );

  const visibleDonations = useMemo(
    () => allItems.slice(0, displayCount),
    [allItems, displayCount]
  );

  const totals = calculateTotals(allItems, role);
  const thisMonthImpact = calculateThisMonthImpact(allItems, role);

  const handleLoadMore = () => {
    setDisplayCount(prev =>
      Math.min(prev + ITEMS_PER_PAGE, allItems.length)
    );
  };

  const hasMore = displayCount < allItems.length;
  const isAtMax = displayCount >= allItems.length;

  return {
    role,
    visibleDonations,
    formatDate,
    handleLoadMore,
    hasMore,
    isAtMax,
    ...totals,
    ...thisMonthImpact,
  };
};
