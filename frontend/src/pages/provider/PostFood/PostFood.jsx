import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import PostFoodStepper from './PostFoodStepper';
import PostFoodNavigation from './PostFoodNavigation';

import FoodDetailsStep from './steps/FoodDetailsStep';
import AvailabilityStep from './steps/AvailabilityStep';
import LocationStep from './steps/LocationStep';
import ReviewStep from './steps/ReviewStep';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import api from '@/utils/axios';

const steps = [
    { id: 'details', title: 'Food Details', description: 'Tell us about the food' },
    { id: 'availability', title: 'Availability', description: 'When can it be picked up?' },
    { id: 'location', title: 'Location', description: 'Where to pick it up?' },
    { id: 'review', title: 'Review', description: 'Confirm and post' },
];

const PostFood = () => {
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState('details');
    const [mediaFiles, setMediaFiles] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        foodType: 'veg',
        quantity: 10,
        quantityUnit: 'plates',
        freshness: 'fresh',
        bestBefore: '',
        availableFrom: '',
        availableTo: '',
        pricingType: 'free',
        price: 0,
        address: '',
        useCurrentLocation: false,
        lat: null,
        lng: null,
    });


    const currentStepIndex = steps.findIndex(s => s.id === currentStep);

    /* ---------------- FRONTEND VALIDATION ---------------- */
    const validateBeforeSubmit = () => {
        if (!formData.title.trim()) {
            toast.error('Food title is required');
            return false;
        }
        if (!formData.quantity || formData.quantity < 1) {
            toast.error('Quantity must be at least 1');
            return false;
        }
        if (!formData.bestBefore) {
            toast.error('Best before time is required');
            return false;
        }
        if (formData.useCurrentLocation && (!formData.lat || !formData.lng)) {
            toast.error('GPS location not captured');
            return false;
        }
        if (!formData.useCurrentLocation && !formData.address.trim()) {
            toast.error('Pickup address is required');
            return false;
        }
        if (
            formData.availableFrom &&
            formData.availableTo &&
            new Date(formData.availableFrom) > new Date(formData.availableTo)
        ) {
            toast.error('Available From cannot be after Available Until');
            return false;
        }

        return true;
    };

    /* ---------------- SUBMIT ---------------- */
    const handleSubmit = async () => {
        if (!validateBeforeSubmit()) return;
        try {
            const fd = new FormData();

            fd.append('title', formData.title);
            fd.append('description', formData.description);
            fd.append('foodType', formData.foodType);

            fd.append('quantity[amount]', formData.quantity);
            fd.append('quantity[unit]', formData.quantityUnit);

            fd.append('freshness', formData.freshness);

            fd.append('pricing[type]', formData.pricingType);
            fd.append('pricing[amount]', formData.price);

            fd.append('availability[bestBefore]', formData.bestBefore);
            if (formData.availableFrom) {
                fd.append('availability[availableFrom]', formData.availableFrom);
            }
            if (formData.availableTo) {
                fd.append('availability[availableUntil]', formData.availableTo);
            }

            fd.append('location[address]', formData.address);
            fd.append('location[coordinates][0]', formData.lng);
            fd.append('location[coordinates][1]', formData.lat);

            mediaFiles.forEach(file => {
                fd.append('media', file);
            });

            await api.post('/api/food/post-food', fd, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success('Food posted successfully!');
            navigate('/providerDashboard');
        } catch (err) {
            console.error(err);
            toast.error(
                err.response?.data?.message || 'Failed to post food'
            );
        }
    };

    return (
        <div className="bg-amber-200 h-full w-full overflow-y-auto py-10 px-[3%] sm:px-[7%] md:px-[10%] lg:px-[15%]">
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl lg:text-3xl font-bold">Post Food</h1>
                <p className="text-muted-foreground mt-1">
                    Share surplus food with those who need it
                </p>
            </motion.div>

            <PostFoodStepper steps={steps} currentStepIndex={currentStepIndex} />

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>{steps[currentStepIndex].title}</CardTitle>
                            <CardDescription>
                                {steps[currentStepIndex].description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {currentStep === 'details' && (
                                <FoodDetailsStep
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            )}

                            {currentStep === 'availability' && (
                                <AvailabilityStep
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            )}

                            {currentStep === 'location' && (
                                <LocationStep
                                    formData={formData}
                                    setFormData={setFormData}
                                    mediaFiles={mediaFiles}
                                    setMediaFiles={setMediaFiles}
                                />
                            )}

                            {currentStep === 'review' && (
                                <ReviewStep formData={formData} />
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>

            <PostFoodNavigation
                currentStep={currentStep}
                currentStepIndex={currentStepIndex}
                steps={steps}
                setCurrentStep={setCurrentStep}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default PostFood;