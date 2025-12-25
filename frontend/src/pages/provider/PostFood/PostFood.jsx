// import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Leaf, 
//   Drumstick, 
//   Clock, 
//   MapPin, 
//   Camera,
//   ArrowRight,
//   ArrowLeft,
//   Check,
//   Utensils,
//   Calendar,
//   DollarSign,
//   Sparkles
// } from 'lucide-react';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';

// const steps = [
//   { id: 'details', title: 'Food Details', description: 'Tell us about the food' },
//   { id: 'availability', title: 'Availability', description: 'When can it be picked up?' },
//   { id: 'location', title: 'Location', description: 'Where to pick it up?' },
//   { id: 'review', title: 'Review', description: 'Confirm and post' },
// ];

// const PostFood = () => {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState('details');
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     foodType: 'veg',
//     quantity: 10,
//     quantityUnit: 'plates',
//     freshness: 'fresh',
//     bestBefore: '',
//     availableFrom: '',
//     availableTo: '',
//     price: 0,
//     address: '',
//     useCurrentLocation: false,
//   });

//   const currentStepIndex = steps.findIndex(s => s.id === currentStep);

//   const handleNext = () => {
//     const nextIndex = currentStepIndex + 1;
//     if (nextIndex < steps.length) {
//       setCurrentStep(steps[nextIndex].id);
//     }
//   };

//   const handleBack = () => {
//     const prevIndex = currentStepIndex - 1;
//     if (prevIndex >= 0) {
//       setCurrentStep(steps[prevIndex].id);
//     }
//   };

//   const handleSubmit = () => {
//     toast.success('Food posted successfully! Seekers can now see your listing.', {
//       description: 'You will be notified when someone requests pickup.',
//     });
//     navigate('/providerDashboard');
//   };

//   const handleGetLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setFormData(prev => ({ ...prev, useCurrentLocation: true }));
//           toast.success('Location captured successfully!');
//         },
//         () => {
//           toast.error('Unable to get location. Please enter manually.');
//         }
//       );
//     }
//   };

//   return (
//       <div className="bg-amber-200 h-full w-full overflow-y-auto py-10 px-[3%] sm:px-[7%] md:px-[10%] lg:px-[15%]">
//         {/* Header */}
//         <motion.div 
//           className="mb-8"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <h1 className="text-2xl lg:text-3xl font-bold">Post Food</h1>
//           <p className="text-muted-foreground mt-1">Share surplus food with those who need it</p>
//         </motion.div>

//         {/* Progress Steps */}
//         <motion.div 
//           className="mb-8"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.1 }}
//         >
//           <div className="flex items-center justify-between">
//             {steps.map((step, index) => (
//               <div key={step.id} className="flex items-center flex-1 last:flex-none">
//                 <div className="flex flex-col items-center">
//                   <div
//                     className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
//                       index < currentStepIndex
//                         ? 'bg-primary text-primary-foreground'
//                         : index === currentStepIndex
//                         ? 'bg-accent text-accent-foreground shadow-accent'
//                         : 'bg-muted text-muted-foreground'
//                     }`}
//                   >
//                     {index < currentStepIndex ? (
//                       <Check className="w-5 h-5" />
//                     ) : (
//                       <span className="font-semibold">{index + 1}</span>
//                     )}
//                   </div>
//                   <span className="text-xs mt-2 text-center hidden sm:block">
//                     {step.title}
//                   </span>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div
//                     className={`flex-1 h-1 mx-3 rounded-full transition-all duration-300 ${
//                       index < currentStepIndex ? 'bg-primary' : 'bg-muted'
//                     }`}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Form Content */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentStep}
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Card>
//               <CardHeader>
//                 <CardTitle>{steps[currentStepIndex].title}</CardTitle>
//                 <CardDescription>{steps[currentStepIndex].description}</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 {/* food details section */}
//                 {currentStep === 'details' && (
//                   <>
//                     <div className="space-y-2">
//                       <Label htmlFor="title">Food Title *</Label>
//                       <Input
//                         id="title"
//                         placeholder="e.g., Vegetable Biryani, Mixed Thali Set"
//                         value={formData.title}
//                         onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="description">Description (optional)</Label>
//                       <Textarea
//                         id="description"
//                         placeholder="Add any details about the food..."
//                         value={formData.description}
//                         onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//                         rows={3}
//                       />
//                     </div>

//                     <div className="space-y-3">
//                       <Label>Food Type *</Label>
//                       <div className="flex flex-col sm:flex-row gap-3">
//                         {[
//                           { id: 'veg', label: 'Vegetarian', icon: Leaf, color: 'success' },
//                           { id: 'non-veg', label: 'Non-Veg', icon: Drumstick, color: 'destructive' },
//                           { id: 'mixed', label: 'Mixed', icon: Utensils, color: 'warning' },
//                         ].map((type) => {
//                           const IconComponent = type.icon;
//                           return (
//                             <button
//                               key={type.id}
//                               type="button"
//                               onClick={() => setFormData(prev => ({ ...prev, foodType: type.id }))}
//                               className={`flex-1 p-4 rounded-xl border-2 transition-all ${
//                                 formData.foodType === type.id
//                                   ? 'border-primary bg-primary/5'
//                                   : 'border-border hover:border-primary/30'
//                               }`}
//                             >
//                               <IconComponent className={`w-6 h-6 mx-auto mb-2 ${
//                                 type.color === 'success' ? 'text-success' : 
//                                 type.color === 'destructive' ? 'text-destructive' : 'text-warning'
//                               }`} />
//                               <span className="text-sm font-medium">{type.label}</span>
//                             </button>
//                           );
//                         })}
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="quantity">Quantity *</Label>
//                         <Input
//                           id="quantity"
//                           type="number"
//                           min={1}
//                           value={formData.quantity}
//                           onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="unit">Unit</Label>
//                         <select
//                           id="unit"
//                           value={formData.quantityUnit}
//                           onChange={(e) => setFormData(prev => ({ ...prev, quantityUnit: e.target.value }))}
//                           className="w-full h-10 px-3 rounded-lg border border-input bg-background"
//                         >
//                           <option value="plates">Plates</option>
//                           <option value="servings">Servings</option>
//                           <option value="kg">Kg</option>
//                           <option value="portions">Portions</option>
//                         </select>
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       <Label>Freshness</Label>
//                       <div className="flex flex-col sm:flex-row gap-3">
//                         {[
//                           { id: 'fresh', label: 'Fresh', desc: 'Just prepared' },
//                           { id: 'good', label: 'Good', desc: 'A few hours old' },
//                           { id: 'use-soon', label: 'Use Soon', desc: 'Best consumed quickly' },
//                         ].map((freshness) => (
//                           <button
//                             key={freshness.id}
//                             type="button"
//                             onClick={() => setFormData(prev => ({ ...prev, freshness: freshness.id }))}
//                             className={`flex-1 p-3 rounded-xl border-2 transition-all ${
//                               formData.freshness === freshness.id
//                                 ? 'border-primary bg-primary/5'
//                                 : 'border-border hover:border-primary/30'
//                             }`}
//                           >
//                             <span className="text-sm font-medium block">{freshness.label}</span>
//                             <span className="text-xs text-muted-foreground">{freshness.desc}</span>
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </>
//                 )}

//                 {/* Availability section */}
//                 {currentStep === 'availability' && (
//                   <>
//                     <div className="space-y-2">
//                       <Label htmlFor="bestBefore">
//                         <Clock className="w-4 h-4 inline mr-2" />
//                         Best Before *
//                       </Label>
//                       <Input
//                         id="bestBefore"
//                         type="datetime-local"
//                         value={formData.bestBefore}
//                         onChange={(e) => setFormData(prev => ({ ...prev, bestBefore: e.target.value }))}
//                       />
//                       <p className="text-xs text-muted-foreground">When should this food be consumed by?</p>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="availableFrom">
//                           <Calendar className="w-4 h-4 inline mr-2" />
//                           Available From
//                         </Label>
//                         <Input
//                           id="availableFrom"
//                           type="datetime-local"
//                           value={formData.availableFrom}
//                           onChange={(e) => setFormData(prev => ({ ...prev, availableFrom: e.target.value }))}
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="availableTo">Available Until</Label>
//                         <Input
//                           id="availableTo"
//                           type="datetime-local"
//                           value={formData.availableTo}
//                           onChange={(e) => setFormData(prev => ({ ...prev, availableTo: e.target.value }))}
//                         />
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       <Label>
//                         <DollarSign className="w-4 h-4 inline mr-2" />
//                         Pricing
//                       </Label>
//                       <div className="flex gap-3">
//                         <button
//                           type="button"
//                           onClick={() => setFormData(prev => ({ ...prev, price: 0 }))}
//                           className={`flex-1 p-4 rounded-xl border-2 transition-all ${
//                             formData.price === 0
//                               ? 'border-success bg-success/5'
//                               : 'border-border hover:border-success/30'
//                           }`}
//                         >
//                           <Sparkles className="w-6 h-6 mx-auto mb-2 text-success" />
//                           <span className="text-sm font-medium block">Free</span>
//                           <span className="text-xs text-muted-foreground">Donate for free</span>
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => setFormData(prev => ({ ...prev, price: 10 }))}
//                           className={`flex-1 p-4 rounded-xl border-2 transition-all ${
//                             formData.price > 0
//                               ? 'border-primary bg-primary/5'
//                               : 'border-border hover:border-primary/30'
//                           }`}
//                         >
//                           <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
//                           <span className="text-sm font-medium block">Minimal Price</span>
//                           <span className="text-xs text-muted-foreground">Cover basic costs</span>
//                         </button>
//                       </div>
//                       {formData.price > 0 && (
//                         <div className="space-y-2">
//                           <Label htmlFor="price">Price (₹)</Label>
//                           <Input
//                             id="price"
//                             type="number"
//                             min={1}
//                             value={formData.price}
//                             onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   </>
//                 )}

//                 {/* location section */}
//                 {currentStep === 'location' && (
//                   <>
//                     <div className="space-y-4">
//                       <Label>
//                         <MapPin className="w-4 h-4 inline mr-2" />
//                         Pickup Location
//                       </Label>
                      
//                       <div className="grid grid-cols-2 gap-3">
//                         <Button
//                           type="button"
//                           variant={formData.useCurrentLocation ? 'default' : 'outline'}
//                           className="h-auto py-4"
//                           onClick={handleGetLocation}
//                         >
//                           <MapPin className="w-5 h-5 mr-2" />
//                           <div className="text-left">
//                             <span className="block font-medium">Use GPS</span>
//                             <span className="text-xs opacity-80">Get my current location</span>
//                           </div>
//                         </Button>
//                         <Button
//                           type="button"
//                           variant={!formData.useCurrentLocation && formData.address ? 'default' : 'outline'}
//                           className="h-auto py-4"
//                           onClick={() => setFormData(prev => ({ ...prev, useCurrentLocation: false }))}
//                         >
//                           <MapPin className="w-5 h-5 mr-2" />
//                           <div className="text-left">
//                             <span className="block font-medium">Enter Manually</span>
//                             <span className="text-xs opacity-80">Type the address</span>
//                           </div>
//                         </Button>
//                       </div>

//                       {formData.useCurrentLocation && (
//                         <div className="p-4 rounded-xl bg-success/10 border border-success/20">
//                           <div className="flex items-center gap-2">
//                             <Check className="w-5 h-5 text-success" />
//                             <span className="font-medium text-success">Location captured!</span>
//                           </div>
//                           <p className="text-sm text-muted-foreground mt-1">
//                             Your current location will be used for pickup.
//                           </p>
//                         </div>
//                       )}

//                       {!formData.useCurrentLocation && (
//                         <div className="space-y-2">
//                           <Input
//                             placeholder="Search for a location..."
//                             value={formData.address}
//                             onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
//                           />
//                           <p className="text-xs text-muted-foreground">
//                             Start typing to search for your address
//                           </p>
//                         </div>
//                       )}
//                     </div>

//                     <div className="space-y-2">
//                       <Label>
//                         <Camera className="w-4 h-4 inline mr-2" />
//                         Food Images (optional)
//                       </Label>
//                       <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
//                         <Camera className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
//                         <p className="text-sm text-muted-foreground">
//                           Click to upload or drag & drop
//                         </p>
//                         <p className="text-xs text-muted-foreground mt-1">
//                           PNG, JPG up to 5MB
//                         </p>
//                       </div>
//                     </div>
//                   </>
//                 )}

//                 {/* review section */}
//                 {currentStep === 'review' && (
//                   <div className="space-y-6">
//                     <div className="p-4 rounded-xl bg-muted/30 space-y-4">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <h3 className="font-semibold text-lg">{formData.title || 'Untitled Food'}</h3>
//                           {formData.description && (
//                             <p className="text-sm text-muted-foreground mt-1">{formData.description}</p>
//                           )}
//                         </div>
//                         <Badge variant={formData.foodType === 'veg' ? 'veg' : formData.foodType === 'non-veg' ? 'nonveg' : 'warning'}>
//                           {formData.foodType}
//                         </Badge>
//                       </div>

//                       <div className="grid grid-cols-2 gap-4 text-sm">
//                         <div>
//                           <span className="text-muted-foreground">Quantity:</span>
//                           <span className="ml-2 font-medium">{formData.quantity} {formData.quantityUnit}</span>
//                         </div>
//                         <div>
//                           <span className="text-muted-foreground">Freshness:</span>
//                           <span className="ml-2 font-medium capitalize">{formData.freshness}</span>
//                         </div>
//                         <div>
//                           <span className="text-muted-foreground">Price:</span>
//                           <span className="ml-2 font-medium">
//                             {formData.price === 0 ? 'Free' : `₹${formData.price}`}
//                           </span>
//                         </div>
//                         <div>
//                           <span className="text-muted-foreground">Location:</span>
//                           <span className="ml-2 font-medium">
//                             {formData.useCurrentLocation ? 'GPS Location' : formData.address || 'Not set'}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
//                       <p className="text-sm">
//                         <strong>Note:</strong> Once posted, nearby seekers will be able to see your listing and request pickup.
//                         You'll receive notifications for each request.
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </motion.div>
//         </AnimatePresence>

//         {/* Navigation Buttons */}
//         <div className="flex justify-between mt-6">
//           <Button
//             variant="outline"
//             onClick={handleBack}
//             disabled={currentStepIndex === 0}
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back
//           </Button>
          
//           {currentStep === 'review' ? (
//             <Button variant="destructive" size="lg" onClick={handleSubmit} className="cursor-pointer">
//               <Check className="w-4 h-4 mr-2" />
//               Post Food
//             </Button>
//           ) : (
//             <Button onClick={handleNext} className="cursor-pointer">
//               Next
//               <ArrowRight className="w-4 h-4 ml-2" />
//             </Button>
//           )}
//         </div>
//       </div>
//   );
// };

// export default PostFood;

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