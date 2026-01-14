export const prepareActivityFeed = (activities) => {
  const normalized = activities.map((activity) => ({
    ...activity,
    timestamp: new Date(activity.timestamp),
  }));

  const sortedActivities = normalized.sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  const now = new Date();
  const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const activitiesLast24h = sortedActivities.filter(
    (activity) => activity.timestamp >= last24Hours
  );

  const displayedActivities =
    activitiesLast24h.length > 30
      ? activitiesLast24h
      : sortedActivities.slice(0, 30);

  return displayedActivities.reduce((groups, activity) => {
    const date = activity.timestamp.toDateString();
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();

    let label;
    if (date === today) label = 'Today';
    else if (date === yesterday) label = 'Yesterday';
    else {
      label = activity.timestamp.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      });
    }

    if (!groups[label]) groups[label] = [];
    groups[label].push(activity);

    return groups;
  }, {});
};
