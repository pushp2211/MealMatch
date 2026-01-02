import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Clock, Calendar, DollarSign, Sparkles } from 'lucide-react';

const AvailabilityStep = ({ formData, setFormData }) => {
    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="bestBefore">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Best Before *
                </Label>
                <Input
                    id="bestBefore"
                    type="datetime-local"
                    value={formData.bestBefore}
                    onChange={(e) => setFormData(prev => ({ ...prev, bestBefore: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">When should this food be consumed by?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="availableFrom">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Available From
                    </Label>
                    <Input
                        id="availableFrom"
                        type="datetime-local"
                        value={formData.availableFrom}
                        onChange={(e) => setFormData(prev => ({ ...prev, availableFrom: e.target.value }))}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="availableTo">Available Until</Label>
                    <Input
                        id="availableTo"
                        type="datetime-local"
                        value={formData.availableTo}
                        onChange={(e) => setFormData(prev => ({ ...prev, availableTo: e.target.value }))}
                    />
                </div>
            </div>

            <div className="space-y-3">
                <Label>
                    <DollarSign className="w-4 h-4 inline mr-2" />
                    Pricing
                </Label>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() =>
                            setFormData(prev => ({
                                ...prev,
                                pricingType: 'free',
                                price: 0,
                            }))
                        }
                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${formData.pricingType === 'free'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/30'
                            }`}
                    >
                        <Sparkles className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <span className="text-sm font-medium block">Free</span>
                        <span className="text-xs text-muted-foreground">Donate for free</span>
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setFormData(prev => ({
                                ...prev,
                                pricingType: 'minimal',
                                price: prev.price || 10,
                            }))
                        }
                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${formData.pricingType === 'minimal'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/30'
                            }`}
                    >
                        <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <span className="text-sm font-medium block">Minimal Price</span>
                        <span className="text-xs text-muted-foreground">Cover basic costs</span>
                    </button>
                </div>

                {formData.pricingType === 'minimal' && (
                    <div className="space-y-2">
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input
                            id="price"
                            type="number"
                            min={1}
                            value={formData.price}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    price: parseInt(e.target.value) || 0,
                                }))
                            }
                        />
                    </div>
                )}
            </div>

        </>
    );
};

export default AvailabilityStep;