import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Leaf, Drumstick, Utensils } from 'lucide-react';

const FoodDetailsStep = ({ formData, setFormData }) => {
    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="title">Food Title *</Label>
                <Input
                    id="title"
                    placeholder="e.g., Vegetable Biryani, Mixed Thali Set"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                    id="description"
                    placeholder="Add any details about the food..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                />
            </div>

            <div className="space-y-3">
                <Label>Food Type *</Label>
                <div className="flex flex-col sm:flex-row gap-3">
                    {[
                        { id: 'veg', label: 'Vegetarian', icon: Leaf, color: 'success' },
                        { id: 'non-veg', label: 'Non-Veg', icon: Drumstick, color: 'destructive' },
                        { id: 'mixed', label: 'Mixed', icon: Utensils, color: 'warning' },
                    ].map((type) => {
                        const IconComponent = type.icon;
                        return (
                            <button
                                key={type.id}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, foodType: type.id }))}
                                className={`flex-1 p-4 rounded-xl border-2 transition-all ${formData.foodType === type.id
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/30'
                                    }`}
                            >
                                <IconComponent className={`w-6 h-6 mx-auto mb-2 ${type.color === 'success' ? 'text-success' :
                                    type.color === 'destructive' ? 'text-destructive' : 'text-warning'
                                    }`} />
                                <span className="text-sm font-medium">{type.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                        id="quantity"
                        type="number"
                        min={1}
                        value={formData.quantity}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <select
                        id="unit"
                        value={formData.quantityUnit}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantityUnit: e.target.value }))}
                        className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                    >
                        <option value="plates">Plates</option>
                        <option value="servings">Servings</option>
                        <option value="kg">Kg</option>
                        <option value="portions">Portions</option>
                    </select>
                </div>
            </div>

            <div className="space-y-3">
                <Label>Freshness</Label>
                <div className="flex flex-col sm:flex-row gap-3">
                    {[
                        { id: 'fresh', label: 'Fresh', desc: 'Just prepared' },
                        { id: 'good', label: 'Good', desc: 'A few hours old' },
                        { id: 'use-soon', label: 'Use Soon', desc: 'Best consumed quickly' },
                    ].map((freshness) => (
                        <button
                            key={freshness.id}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, freshness: freshness.id }))}
                            className={`flex-1 p-3 rounded-xl border-2 transition-all ${formData.freshness === freshness.id
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/30'
                                }`}
                        >
                            <span className="text-sm font-medium block">{freshness.label}</span>
                            <span className="text-xs text-muted-foreground">{freshness.desc}</span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FoodDetailsStep;