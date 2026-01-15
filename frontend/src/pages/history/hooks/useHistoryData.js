import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from '../constants';
import { fetchHistory } from "@/api/history.api";

export const useHistoryData = () => {
  const [data, setData] = useState(null);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return { loading: true };
  }

  const visibleDonations = data.items.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount(prev =>
      Math.min(prev + ITEMS_PER_PAGE, data.items.length)
    );
  };

  return {
    loading: false,
    visibleDonations,
    handleLoadMore,
    hasMore: displayCount < data.items.length,
    isAtMax: displayCount >= data.items.length,
    ...data.stats,
    ...data.thisMonth,
  };
};
