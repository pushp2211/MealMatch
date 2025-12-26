import { useState, useMemo } from 'react';
import { mockDonationHistory } from '@/data/mockData';
import { ITEMS_PER_PAGE } from '../constants';
import {
  getLimitedDonations,
  calculateTotals,
  calculateThisMonthImpact,
  formatDate
} from '../utils/history.utils';

export const useHistoryData = () => {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  const allDonations = useMemo(
    () => getLimitedDonations(mockDonationHistory),
    []
  );

  const visibleDonations = useMemo(
    () => allDonations.slice(0, displayCount),
    [allDonations, displayCount]
  );

  const totals = calculateTotals(allDonations);
  const thisMonthImpact = calculateThisMonthImpact(allDonations);

  const handleLoadMore = () => {
    setDisplayCount(prev =>
      Math.min(prev + ITEMS_PER_PAGE, allDonations.length)
    );
  };

  const hasMore = displayCount < allDonations.length;
  const isAtMax = displayCount >= allDonations.length;

  return {
    visibleDonations,
    formatDate,
    handleLoadMore,
    hasMore,
    isAtMax,
    ...totals,
    ...thisMonthImpact
  };
};
