
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Square, Tag } from 'lucide-react';

const SearchResultsCarousel = ({ properties, onPropertyClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, properties.length - itemsPerView);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  if (!properties.length) {
    return (
      <div className="text-center py-12">
        <p className="text-black/60 text-lg">No hay propiedades disponibles</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
          }}
        >
          {properties.map((property) => (
            <motion.div
              key={property.id}
              className={`flex-shrink-0 px-3 ${
                itemsPerView === 1 ? 'w-full' : 
                itemsPerView === 2 ? 'w-1/2' : 'w-1/3'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="property-card cursor-pointer h-full"
                onClick={() => onPropertyClick(property)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="property-badge">
                    ${property.price?.toLocaleString()}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-black font-semibold text-sm bg-white/80 px-2 py-1 rounded">
                        {property.type}
                      </span>
                      {property.operation && (
                        <span className={`text-white font-semibold text-sm px-2 py-1 rounded ${
                          property.operation === 'Venta' 
                            ? 'bg-amber-500/80' 
                            : 'bg-amber-500/80'
                        }`}>
                          {property.operation}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2">
                    {property.title}
                  </h3>
                  
                  <div className="flex items-center text-black/70 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

              {property.operation && (
                <div className="flex items-center text-black/70 mb-3 gap-2">
                  <Tag className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">
                    {property.operation}
                  </span>

                  {property.acceptsSquareMeters === 'Sí' && (
                    <span className="text-xs bg-amber-100 text-black-800 px-2 py-0.5 rounded">
                      Acepta m²
                    </span>
                  )}
                </div>
              )}
                  
                  <div className="flex items-center justify-between text-black/80 text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        <span>{property.area}m²</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {properties.length > itemsPerView && (
        <>
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/30 text-black p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/30 text-black p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm ${
              currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </>
      )}

      {properties.length > itemsPerView && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-black' : 'bg-black/50 hover:bg-black/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsCarousel;
