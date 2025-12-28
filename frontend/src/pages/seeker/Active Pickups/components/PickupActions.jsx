import { Button } from '@/components/ui/button';
import { CheckCircle, Phone, AlertTriangle } from 'lucide-react';
import { useSeekerActivePickups } from '../hooks/useSeekerActivePickups';

const PickupActions = ({ pickup }) => {
  const { markCompleted, reportIssue } = useSeekerActivePickups();

  return (
    <div className="flex flex-wrap gap-3">
      <Button className="flex-1" onClick={() => markCompleted(pickup.id)}>
        <CheckCircle className="w-4 h-4 mr-2" />
        Mark as Completed
      </Button>

      {pickup.providerPhone && (
        <Button variant="outline">
          <Phone className="w-4 h-4 mr-2" />
          Call Provider
        </Button>
      )}

      <Button
        variant="outline"
        onClick={() => reportIssue(pickup.id)}
      >
        <AlertTriangle className="w-4 h-4 mr-2" />
        Report Issue
      </Button>
    </div>
  );
};

export default PickupActions;
