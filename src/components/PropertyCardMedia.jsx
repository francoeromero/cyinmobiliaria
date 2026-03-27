import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getPropertyImageUrls } from '@/utils/propertyImages';

/**
 * Imagen de la card; con varias URLs, flechas para carrusel dentro de la card.
 */
const PropertyCardMedia = ({ property, alt }) => {
  const urls = getPropertyImageUrls(property);
  const n = urls.length;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [property?.id]);

  const safeIndex = n > 0 ? ((index % n) + n) % n : 0;
  const src = urls[safeIndex] || '';
  const showArrows = n > 1;

  const goPrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i - 1 + n) % n);
  };

  const goNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i + 1) % n);
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
      />
      {showArrows && (
        <>
          <button
            type="button"
            className="absolute left-0 top-1/2 z-20 flex h-full max-h-12 w-9 -translate-y-1/2 items-center justify-center rounded-r-md bg-black/40 text-white backdrop-blur-[2px] transition-colors hover:bg-black/55"
            aria-label="Imagen anterior"
            onClick={goPrev}
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            className="absolute right-0 top-1/2 z-20 flex h-full max-h-12 w-9 -translate-y-1/2 items-center justify-center rounded-l-md bg-black/40 text-white backdrop-blur-[2px] transition-colors hover:bg-black/55"
            aria-label="Imagen siguiente"
            onClick={goNext}
          >
            <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
          </button>
          <div
            className="pointer-events-none absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1"
            aria-hidden
          >
            {urls.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === safeIndex ? 'bg-white' : 'bg-white/45'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default PropertyCardMedia;
