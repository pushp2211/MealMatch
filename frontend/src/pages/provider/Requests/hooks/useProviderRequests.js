import { useState } from 'react';
import { mockPickupRequests } from '@/data/mockData';
import { toast } from 'sonner';
import { filterRequests, countByStatus } from '../utils/requests.utils';

export const useProviderRequests = () => {
  const [requests, setRequests] = useState(mockPickupRequests);
  const [filter, setFilter] = useState('all');

  const filteredRequests = filterRequests(requests, filter);
  const pendingCount = countByStatus(requests, 'pending');
  const acceptedCount = countByStatus(requests, 'accepted');

  const handleAccept = (id) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: 'accepted', acceptedAt: new Date() } : r
      )
    );
    toast.success('Request accepted! Contact details unlocked.');
  };

  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r))
    );
    toast.info('Request declined.');
  };

  const handleComplete = (id) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: 'completed', completedAt: new Date() }
          : r
      )
    );
    toast.success('Pickup completed! Thank you for your donation.');
  };

  const handleNoShow = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'no-show' } : r))
    );
    toast.warning('Marked as no-show.');
  };

  return {
    filter,
    setFilter,
    filteredRequests,
    pendingCount,
    acceptedCount,
    handleAccept,
    handleReject,
    handleComplete,
    handleNoShow,
  };
};
