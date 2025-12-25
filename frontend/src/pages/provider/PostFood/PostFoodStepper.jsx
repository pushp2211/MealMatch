import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const PostFoodStepper = ({ steps, currentStepIndex }) => {
    return (
        <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
        >
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${index < currentStepIndex
                                    ? 'bg-primary text-primary-foreground'
                                    : index === currentStepIndex
                                        ? 'bg-accent text-accent-foreground shadow-accent'
                                        : 'bg-muted text-muted-foreground'
                                    }`}
                            >
                                {index < currentStepIndex ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <span className="font-semibold">{index + 1}</span>
                                )}
                            </div>
                            <span className="text-xs mt-2 text-center hidden sm:block">
                                {step.title}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`flex-1 h-1 mx-3 rounded-full transition-all duration-300 ${index < currentStepIndex ? 'bg-primary' : 'bg-muted'
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default PostFoodStepper;
