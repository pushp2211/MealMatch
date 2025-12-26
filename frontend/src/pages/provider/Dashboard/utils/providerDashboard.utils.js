import { formatTimeAgo } from '@/data/mockData';

export const generateAlerts = ({ foodPosts, pickupRequests }) => [
  ...foodPosts
    .filter(p => {
      const hours =
        (p.bestBefore.getTime() - Date.now()) / (1000 * 60 * 60);
      return hours < 6 && hours > 0;
    })
    .map(p => {
      const hoursAgo = Math.floor(
        (Date.now() - p.createdAt.getTime()) / (1000 * 60 * 60)
      );
      const hoursLeft = Math.floor(
        (p.bestBefore.getTime() - Date.now()) / (1000 * 60 * 60)
      );

      return {
        id: p.id,
        type: 'expiring',
        title: `${p.title} posted ${hoursAgo}h ago expires in ${hoursLeft} hours`,
        time: formatTimeAgo(p.createdAt),
        urgent: hoursLeft < 4
      };
    }),

  ...pickupRequests
    .filter(r => r.status === 'pending')
    .slice(0, 1)
    .map(r => ({
      id: r.id,
      type: 'request',
      title: `New pickup request from ${
        r.seeker.type === 'ngo' ? 'NGO' : r.seeker.type
      } nearby`,
      time: formatTimeAgo(r.createdAt),
      urgent: false
    }))
];

export const generateRecentActivity = ({
  foodPosts,
  pickupRequests,
  donationHistory
}) => [
  ...foodPosts.slice(0, 1).map(p => ({
    id: p.id,
    type: 'posted',
    title: `${p.title} - ${p.quantity} ${p.quantityUnit}`,
    time: formatTimeAgo(p.createdAt)
  })),

  ...donationHistory.slice(0, 1).map(d => ({
    id: d.id,
    type: 'completed',
    title: `${d.foodPost.title} - ${d.quantityDonated} ${d.foodPost.quantityUnit}`,
    time: formatTimeAgo(d.completedAt)
  })),

  ...pickupRequests
    .filter(r => r.status === 'accepted')
    .slice(0, 1)
    .map(r => ({
      id: r.id,
      type: 'accepted',
      title: `${r.foodPost.title} - ${r.requestedQuantity} ${r.foodPost.quantityUnit}`,
      time: formatTimeAgo(r.createdAt)
    }))
];
