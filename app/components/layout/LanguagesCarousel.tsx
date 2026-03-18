import { IMAGES } from '@/constants/images';

export const LanguagesCarousel = () => {
  return (
    <div className="flex flex-row w-full py-8 overflow-hidden carousel-container will-change-transform">
      <div className="flex shrink-0 animate-carousel">
        {[...IMAGES].map(({ name, href }, i) => (
          <div
            key={i}
            className="px-6 transition-all duration-300 shrink-0 hover:scale-110 "
          >
            <img
              src={href}
              alt={name}
              className="w-auto h-12 opacity-80 hover:opacity-100 drop-shadow-lg"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="flex shrink-0 animate-carousel">
        {[...IMAGES].map(({ name, href }, i) => (
          <div
            key={i}
            className="px-6 transition-all duration-300 shrink-0 hover:scale-110"
          >
            <img
              src={href}
              alt={name}
              className="w-auto h-12 opacity-80 hover:opacity-100 drop-shadow-lg"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-y-0 left-0 flex w-1/4 pointer-events-none bg-linear-to-r from-bgDark2"></div>
      <div className="absolute inset-y-0 right-0 flex w-1/4 pointer-events-none bg-linear-to-l from-bgDark2"></div>
    </div>
  );
};
