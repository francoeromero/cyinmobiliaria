import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Square } from 'lucide-react';

const PropertyCarousel = ({ properties }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || properties.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % properties.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, properties.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + properties.length) % properties.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % properties.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (!properties.length) {
    return (
      <div className="carousel-container flex items-center justify-center">
        <p className="text-white/60 text-lg">No hay propiedades disponibles</p>
      </div>
    );
  }

  return (
    <div className="carousel-container relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="relative h-full">
            <img
              src={properties[currentIndex].image}
              alt={properties[currentIndex].title}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
              <div className="max-w-2xl">
                <div className="property-badge mb-2 sm:mb-4 -mt-32">
                  ${properties[currentIndex].price?.toLocaleString()}
                </div>
                
                <h2 className="text-xl sm:text-3xl font-bold text-white mb-2 line-clamp-2">
                  {properties[currentIndex].title}
                </h2>
                
                <div className="flex items-center text-white/90 mb-2 sm:mb-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-sm sm:text-lg">{properties[currentIndex].location}</span>
                </div>
                
                <div className="hidden sm:flex items-center space-x-6 text-white/80 mb-4">
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 mr-2" />
                    <span>{properties[currentIndex].bedrooms} habs</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 mr-2" />
                    <span>{properties[currentIndex].bathrooms} baños</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-5 h-5 mr-2" />
                    <span>{properties[currentIndex].area}m²</span>
                  </div>
                </div>
                
                {properties[currentIndex].description && (
                  <p className="text-white/70 text-sm sm:text-base max-w-xl line-clamp-2">
                    {properties[currentIndex].description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {properties.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="carousel-nav left-2 md:left-4"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={goToNext}
            className="carousel-nav right-2 md:right-4"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="carousel-indicators">
            {properties.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyCarousel;