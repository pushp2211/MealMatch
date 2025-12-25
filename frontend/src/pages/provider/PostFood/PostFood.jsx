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

const steps = [
    { id: 'details', title: 'Food Details', description: 'Tell us about the food' },
    { id: 'availability', title: 'Availability', description: 'When can it be picked up?' },
    { id: 'location', title: 'Location', description: 'Where to pick it up?' },
    { id: 'review', title: 'Review', description: 'Confirm and post' },
];

const PostFood = () => {
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState('details');
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
        price: 0,
        address: '',
        useCurrentLocation: false,
    });

    const currentStepIndex = steps.findIndex(s => s.id === currentStep);

    const handleSubmit = () => {
        toast.success('Food posted successfully!', {
            description: 'You will be notified when someone requests pickup.',
        });
        navigate('/providerDashboard');
    };

    return (
        <div className="bg-amber-200 h-full w-full overflow-y-auto py-10 px-[3%] sm:px-[7%] md:px-[10%] lg:px-[15%]">
            {/* Header */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl lg:text-3xl font-bold">Post Food</h1>
                <p className="text-muted-foreground mt-1">Share surplus food with those who need it</p>
            </motion.div>

            {/* Progress Steps */}
            <PostFoodStepper steps={steps} currentStepIndex={currentStepIndex} />

            {/* Form Content */}
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
                            <CardDescription>{steps[currentStepIndex].description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* food details section */}
                            {currentStep === 'details' && (
                                <FoodDetailsStep formData={formData} setFormData={setFormData} />
                            )}

                            {/* Availability section */}
                            {currentStep === 'availability' && (
                                <AvailabilityStep formData={formData} setFormData={setFormData} />
                            )}

                            {/* location section */}
                            {currentStep === 'location' && (
                                <LocationStep formData={formData} setFormData={setFormData} />
                            )}

                            {/* review section */}
                            {currentStep === 'review' && (
                                <ReviewStep formData={formData} />
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
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