export const getPickupStatus = (acceptedAt) => {
    if (!acceptedAt) return { label: 'Accepted', color: 'success' };

    const timeSinceAccepted = Date.now() - acceptedAt.getTime();
    const minutesSinceAccepted = Math.floor(
        timeSinceAccepted / (1000 * 60)
    );

    if (minutesSinceAccepted < 10)
        return { label: 'Preparing', color: 'info' };

    if (minutesSinceAccepted < 20)
        return { label: 'Ready for Pickup', color: 'success' };

    return { label: 'Waiting', color: 'warning' };
};

export const getTimeRemaining = (isoDate) => {
  if (!isoDate) return "N/A";

  const now = new Date();
  const target = new Date(isoDate);

  const diffMs = target - now;
  if (diffMs <= 0) return "Expired";

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
};
