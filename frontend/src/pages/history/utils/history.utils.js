import { MAX_ITEMS } from '../constants';

export const getLimitedHistory = (items) =>
  items.slice(0, MAX_ITEMS);

export const calculateTotals = (items, role) => {
  if (role === 'seeker') {
    return {
      totalDonations: items.length,
      totalFoodDonated: items.reduce(
        (sum, i) => sum + i.quantityReceived,
        0
      ),
      totalPeopleFed: items.reduce(
        (sum, i) => sum + i.peopleServed,
        0
      ),
      activeDays: new Set(
        items.map(i => i.completedAt.toDateString())
      ).size,
    };
  }

  // PROVIDER (unchanged)
  return {
    totalDonations: items.length,
    totalPeopleFed: items.reduce(
      (sum, i) => sum + i.peopleHelped,
      0
    ),
    totalFoodDonated: items.reduce(
      (sum, i) => sum + i.quantityDonated,
      0
    ),
    activeDays: new Set(
      items.map(i => i.completedAt.toDateString())
    ).size,
  };
};

export const calculateThisMonthImpact = (items, role) => {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const filtered = items.filter(
    i =>
      i.completedAt.getMonth() === month &&
      i.completedAt.getFullYear() === year
  );

  if (role === 'seeker') {
    const food = filtered.reduce(
      (sum, i) => sum + i.quantityReceived,
      0
    );
    return {
      thisMonthPeopleFed: filtered.reduce(
        (sum, i) => sum + i.peopleServed,
        0
      ),
      thisMonthFoodSaved: food,
      estimatedValue: food * 50,
    };
  }

  const food = filtered.reduce(
    (sum, i) => sum + i.quantityDonated,
    0
  );
  return {
    thisMonthPeopleFed: filtered.reduce(
      (sum, i) => sum + i.peopleHelped,
      0
    ),
    thisMonthFoodSaved: food,
    estimatedValue: food * 50,
  };
};

export const formatDate = (date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
