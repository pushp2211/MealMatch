import {
  mockFoodPosts,
  mockPickupRequests,
  mockDonationHistory,
  mockStats
} from '@/data/mockData';

/**
 * Production-ready data hook
 * Later:
 * - read providerId from AuthContext
 * - call backend APIs
 */
export const useProviderDashboard = () => {
  // TEMP: mock data
  const foodPosts = mockFoodPosts;
  const pickupRequests = mockPickupRequests;
  const donationHistory = mockDonationHistory;
  const stats = mockStats;

  return {
    foodPosts,
    pickupRequests,
    donationHistory,
    stats,
    isLoading: false,
    error: null
  };
};
