import React, { useState } from 'react';

const TestimonialCard = ({ image, name, city, review }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-75 h-80 perspective cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)} 
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}>
      <div className={`relative w-full h-full transition-transform duration-1000 transform-style preserve-3d ${ isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front Side */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-darkpink1 via-pink2 to-pink3 rounded-md shadow-lg flex flex-col items-center p-3">
          <img
            src={image}
            alt={name}
            className="w-70 h-50 rounded-md object-cover mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">{city}</p>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-darkpink1 via-pink2 to-pink3 bg-opacity-40 backdrop-blur-xl text-darkblack1 rounded-md p-4 transform rotate-y-180 flex items-center justify-center text-md leading-relaxed text-center border-1 border-pink2">
          {review}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;