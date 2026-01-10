export const getTimeRemaining = (dateInput) => {
  if (!dateInput) return 'N/A';

  // Convert string (from backend) to Date object
  const date = new Date(dateInput);

  // Check if date is invalid
  if (isNaN(date.getTime())) return 'Invalid Date';

  const diff = date.getTime() - Date.now();
  
  if (diff < 0) return 'Expired';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  // If more than 24 hours, show days
  if (hours > 24) {
     const days = Math.floor(hours / 24);
     const remainingHours = hours % 24;
     return `${days}d ${remainingHours}h`;
  }

  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};