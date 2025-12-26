
// Mock Provider Profile
export const mockProvider = {
  id: '1',
  name: 'Green Kitchen Restaurant',
  type: 'restaurant',
  email: 'contact@greenkitchen.com',
  phone: '+91 98765 43210',
  address: '123 Main Street, Koramangala, Bangalore',
  location: { lat: 12.9352, lng: 77.6245 },
  verified: true,
  rating: 4.8,
  totalDonations: 156,
  peopleFed: 2340,
  joinedAt: new Date('2024-01-15'),
  settings: {
    autoAccept: false,
    autoAcceptRadius: 5,
    autoAcceptMinRating: 4.0,
    defaultRadius: 10,
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  }
};


// Mock Dashboard Stats
export const mockStats = {
  activePosts: 3,
  pendingRequests: 7,
  completedToday: 2,
  peopleFedThisMonth: 342,
  totalDonations: 156,
  averageRating: 4.8
};


// Mock Food Posts
export const mockFoodPosts = [
  {
    id: '1',
    title: 'Vegetable Biryani',
    description:
      'Fresh vegetable biryani prepared for a corporate event. Excess quantity available.',
    foodType: 'veg',
    quantity: 50,
    quantityUnit: 'plates',
    freshness: 'fresh',
    bestBefore: new Date(Date.now() + 4 * 60 * 60 * 1000),
    availableFrom: new Date(),
    availableTo: new Date(Date.now() + 6 * 60 * 60 * 1000),
    price: 0,
    location: {
      lat: 12.9352,
      lng: 77.6245,
      address: '123 Main Street, Koramangala'
    },
    images: [],
    status: 'active',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    pickupRequests: 3
  },
  {
    id: '2',
    title: 'Mixed Thali Set',
    description:
      'Complete thali meals with rice, dal, vegetables, roti, and dessert.',
    foodType: 'veg',
    quantity: 25,
    quantityUnit: 'plates',
    freshness: 'fresh',
    bestBefore: new Date(Date.now() + 3 * 60 * 60 * 1000),
    availableFrom: new Date(),
    availableTo: new Date(Date.now() + 4 * 60 * 60 * 1000),
    price: 0,
    location: {
      lat: 12.9352,
      lng: 77.6245,
      address: '123 Main Street, Koramangala'
    },
    images: [],
    status: 'active',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    pickupRequests: 2
  },
  {
    id: '3',
    title: 'Chicken Curry with Rice',
    description: 'Home-style chicken curry with basmati rice.',
    foodType: 'non-veg',
    quantity: 15,
    quantityUnit: 'servings',
    freshness: 'good',
    bestBefore: new Date(Date.now() + 2 * 60 * 60 * 1000),
    availableFrom: new Date(),
    availableTo: new Date(Date.now() + 3 * 60 * 60 * 1000),
    price: 0,
    location: {
      lat: 12.9352,
      lng: 77.6245,
      address: '123 Main Street, Koramangala'
    },
    images: [],
    status: 'active',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    pickupRequests: 2
  }
];


// Mock Seekers
export const mockSeekers = [
  {
    id: '1',
    name: 'Hope Foundation NGO',
    type: 'ngo',
    rating: 4.9,
    totalPickups: 234,
    verified: true,
    distance: 2.3,
    phone: '+91 98765 11111'
  },
  {
    id: '2',
    name: 'City Shelter Home',
    type: 'shelter',
    rating: 4.7,
    totalPickups: 189,
    verified: true,
    distance: 3.1,
    phone: '+91 98765 22222'
  },
  {
    id: '3',
    name: 'Rajan Kumar',
    type: 'individual',
    rating: 4.5,
    totalPickups: 12,
    verified: false,
    distance: 1.5,
    phone: '+91 98765 33333'
  },
  {
    id: '4',
    name: 'FoodShare Community',
    type: 'ngo',
    rating: 4.8,
    totalPickups: 156,
    verified: true,
    distance: 4.2,
    phone: '+91 98765 44444'
  }
];


// Mock Pickup Requests
export const mockPickupRequests = [
  {
    id: '1',
    foodPostId: '1',
    foodPost: mockFoodPosts[0],
    seeker: mockSeekers[0],
    requestedQuantity: 20,
    status: 'pending',
    eta: 15,
    distance: 2.3,
    createdAt: new Date(Date.now() - 10 * 60 * 1000)
  },
  {
    id: '2',
    foodPostId: '1',
    foodPost: mockFoodPosts[0],
    seeker: mockSeekers[1],
    requestedQuantity: 15,
    status: 'pending',
    eta: 20,
    distance: 3.1,
    createdAt: new Date(Date.now() - 15 * 60 * 1000)
  },
  {
    id: '3',
    foodPostId: '2',
    foodPost: mockFoodPosts[1],
    seeker: mockSeekers[2],
    requestedQuantity: 10,
    status: 'accepted',
    eta: 8,
    distance: 1.5,
    createdAt: new Date(Date.now() - 25 * 60 * 1000),
    acceptedAt: new Date(Date.now() - 20 * 60 * 1000)
  },
  {
    id: '4',
    foodPostId: '1',
    foodPost: mockFoodPosts[0],
    seeker: mockSeekers[3],
    requestedQuantity: 15,
    status: 'pending',
    eta: 25,
    distance: 4.2,
    createdAt: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    id: '5',
    foodPostId: '3',
    foodPost: mockFoodPosts[2],
    seeker: mockSeekers[0],
    requestedQuantity: 10,
    status: 'pending',
    eta: 12,
    distance: 2.3,
    createdAt: new Date(Date.now() - 8 * 60 * 1000)
  }
];


// Mock Donation History (30 items)
export const mockDonationHistory = Array.from({ length: 30 }).map(
  (_, i) => {
    const food = mockFoodPosts[i % mockFoodPosts.length];
    const seeker = mockSeekers[i % mockSeekers.length];

    return {
      id: String(i + 1),
      foodPost: {
        ...food,
        title: `${food.title} #${i + 1}`,
        status: 'completed'
      },
      seeker,
      quantityDonated: 15 + (i % 5) * 10,
      peopleHelped: 15 + (i % 5) * 10,
      completedAt: new Date(
        Date.now() - i * 24 * 60 * 60 * 1000
      ),
      rating: 4 + (i % 2),
      feedback:
        i % 3 === 0
          ? 'Great quality food, thank you!'
          : undefined
    };
  }
);


// Helper functions
export const getTimeRemaining = (date) => {
  const diff = date.getTime() - Date.now();
  if (diff < 0) return 'Expired';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(
    (diff % (1000 * 60 * 60)) / (1000 * 60)
  );

  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

export const formatTimeAgo = (date) => {
  const diff = Date.now() - date.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${minutes}m ago`;
};
