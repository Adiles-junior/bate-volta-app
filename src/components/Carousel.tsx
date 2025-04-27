import React, { useState, useEffect } from 'react';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    if (length === 0) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % length);
    }, 3000);
    return () => clearInterval(timer);
  }, [length]);

  if (length === 0) return null;
  return (
    <div className="relative w-full h-48 sm:h-64 overflow-hidden mb-4">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Slide ${idx}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  );
};

export default Carousel;
