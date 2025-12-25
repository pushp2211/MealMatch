import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const PostFoodNavigation = ({ currentStep, currentStepIndex, steps, setCurrentStep, handleSubmit }) => {
    const handleNext = () => {
        const nextIndex = currentStepIndex + 1;
        if (nextIndex < steps.length) {
            setCurrentStep(steps[nextIndex].id);
        }
    };

    const handleBack = () => {
        const prevIndex = currentStepIndex - 1;
        if (prevIndex >= 0) {
            setCurrentStep(steps[prevIndex].id);
        }
    };

    return (
        <div className="flex justify-between mt-6">
            <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStepIndex === 0}
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
            </Button>

            {currentStep === 'review' ? (
                <Button variant="destructive" size="lg" onClick={handleSubmit} className="cursor-pointer">
                    <Check className="w-4 h-4 mr-2" />
                    Post Food
                </Button>
            ) : (
                <Button onClick={handleNext} className="cursor-pointer">
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            )}
        </div>
    );
};

export default PostFoodNavigation;
