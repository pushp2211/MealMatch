import { MessageCircle } from 'lucide-react';

const PickupNote = ({ note }) => {
  if (!note) return null;

  return (
    <div className="p-3 rounded-lg bg-muted/30">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
        <MessageCircle className="w-4 h-4" />
        Your note to provider
      </div>
      <p className="text-sm">{note}</p>
    </div>
  );
};

export default PickupNote;
