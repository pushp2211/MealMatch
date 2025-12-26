import { MAX_ITEMS } from '../constants';

export const getLimitedDonations = (donations) =>
  donations.slice(0, MAX_ITEMS);

export const calculateTotals = (donations) => {
  const totalDonations = donations.length;

  const totalPeopleFed = donations.reduce(
    (sum, d) => sum + d.peopleHelped,
    0
  );

  const totalFoodDonated = donations.reduce(
    (sum, d) => sum + d.quantityDonated,
    0
  );

  const activeDays = new Set(
    donations.map(d => d.completedAt.toDateString())
  ).size;

  return {
    totalDonations,
    totalPeopleFed,
    totalFoodDonated,
    activeDays
  };
};

export const calculateThisMonthImpact = (donations) => {
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const thisMonthDonations = donations.filter(
    d =>
      d.completedAt.getMonth() === thisMonth &&
      d.completedAt.getFullYear() === thisYear
  );

  const thisMonthPeopleFed = thisMonthDonations.reduce(
    (sum, d) => sum + d.peopleHelped,
    0
  );

  const thisMonthFoodSaved = thisMonthDonations.reduce(
    (sum, d) => sum + d.quantityDonated,
    0
  );

  const estimatedValue = thisMonthFoodSaved * 50;

  return {
    thisMonthPeopleFed,
    thisMonthFoodSaved,
    estimatedValue
  };
};

export const formatDate = (date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
