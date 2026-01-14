import { Button } from '@/components/ui/button';
import { CheckCircle, Phone, AlertTriangle } from 'lucide-react';
import { useSeekerActivePickups } from '../hooks/useSeekerActivePickups';

const PickupActions = ({ pickup }) => {
  const { markCompleted, reportIssue } = useSeekerActivePickups();
  // console.log("pickup", pickup);
  return (
    <div className="flex flex-wrap gap-3">
      <Button className="flex-1" onClick={()=>{markCompleted(pickup.pickupCode)}}>
        <CheckCircle className="w-4 h-4 mr-2" />
        Mark as Completed
      </Button>

      {pickup.providerPhone && (
        <Button variant="outline">
          <a href={`tel:${pickup.providerPhone}`} className='flex'>
            <Phone className="w-4 h-4 mr-2" />
            Call Provider
          </a>
        </Button>
      )}

      <Button
        variant="outline"
        onClick={reportIssue}
      >
        <AlertTriangle className="w-4 h-4 mr-2" />
        Report Issue
      </Button>
    </div>
  );
};

export default PickupActions;
