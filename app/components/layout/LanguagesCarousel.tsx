import { IMAGES } from '@/constants/images';
import React, { useEffect, useState } from 'react';

export const LanguagesCarousel = () => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    if (loadedCount === IMAGES.length) {
      setAllLoaded(true);
    }
  }, [loadedCount]);

  return (
    <div className="relative flex flex-row w-full py-8 overflow-hidden carousel-container will-change-transform">
      <div className={`flex shrink-0 ${allLoaded ? 'animate-carousel' : ''}`}>
        {IMAGES.map(({ name, href }, i) => (
          <div
            key={name + 'first'}
            className="px-6 transition-all duration-300 shrink-0 hover:scale-110 not-hover:opacity-70"
          >
            <img
              src={href}
              alt={name}
              className="w-auto h-10 sm:h-12"
              onLoad={() => setLoadedCount((prev) => prev + 1)}
            />
          </div>
        ))}
      </div>
      <div className={`flex shrink-0 ${allLoaded ? 'animate-carousel' : ''}`}>
        {IMAGES.map(({ name, href }, i) => (
          <div
            key={name + 'seccond'}
            className="px-6 transition-all duration-300 shrink-0 hover:scale-110 not-hover:opacity-70"
          >
            <img src={href} alt={name} className="w-auto h-10 sm:h-12 " />
          </div>
        ))}
      </div>

      <div className="absolute inset-y-0 left-0 flex w-1/4 pointer-events-none bg-linear-to-r from-bgc-dark-2"></div>
      <div className="absolute inset-y-0 right-0 flex w-1/4 pointer-events-none bg-linear-to-l from-bgc-dark-2"></div>
    </div>
  );
};
