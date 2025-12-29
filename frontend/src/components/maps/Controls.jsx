import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Layers } from 'lucide-react';

const Controls = ({ onZoomIn, onZoomOut, onToggleStyle }) => {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
      <Button variant="secondary" size="icon" onClick={onZoomIn}>
        <ZoomIn className="w-4 h-4" />
      </Button>

      <Button variant="secondary" size="icon" onClick={onZoomOut}>
        <ZoomOut className="w-4 h-4" />
      </Button>

      <Button variant="secondary" size="icon" onClick={onToggleStyle}>
        <Layers className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Controls;
