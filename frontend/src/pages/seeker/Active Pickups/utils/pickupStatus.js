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
