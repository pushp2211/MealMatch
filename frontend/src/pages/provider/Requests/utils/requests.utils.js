import { Building2, Users, User } from 'lucide-react';

export const getSeekerIcon = (type) => {
  switch (type) {
    case 'ngo':
      return Building2;
    case 'shelter':
      return Users;
    default:
      return User;
  }
};

export const filterRequests = (requests, filter) => {
  if (filter === 'all') {
    return requests.filter(
      (r) => r.status !== 'completed' && r.status !== 'rejected'
    );
  }
  return requests.filter((r) => r.status === filter);
};

export const countByStatus = (requests, status) =>
  requests.filter((r) => r.status === status).length;
