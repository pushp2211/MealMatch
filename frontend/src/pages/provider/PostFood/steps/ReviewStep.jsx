import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ReviewStep = ({ formData }) => {
    return (
        <div className="space-y-6">
            <div className="p-4 rounded-xl bg-muted/30 space-y-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold text-lg">{formData.title || 'Untitled Food'}</h3>
                        {formData.description && (
                            <p className="text-sm text-muted-foreground mt-1">{formData.description}</p>
                        )}
                    </div>
                    <Badge variant={formData.foodType === 'veg' ? 'veg' : formData.foodType === 'non-veg' ? 'nonveg' : 'warning'}>
                        {formData.foodType}
                    </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-muted-foreground">Quantity:</span>
                        <span className="ml-2 font-medium">{formData.quantity} {formData.quantityUnit}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground">Freshness:</span>
                        <span className="ml-2 font-medium capitalize">{formData.freshness}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground">Price:</span>
                        <span className="ml-2 font-medium">
                            {formData.price === 0 ? 'Free' : `₹${formData.price}`}
                        </span>
                    </div>
                    <div>
                        <span className="text-muted-foreground">Location:</span>
                        <span className="ml-2 font-medium">
                            {formData.useCurrentLocation ? 'GPS Location' : formData.address || 'Not set'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                <p className="text-sm">
                    <strong>Note:</strong> Once posted, nearby seekers will be able to see your listing and request pickup.
                    You'll receive notifications for each request.
                </p>
            </div>
        </div>
    );
};

export default ReviewStep;
