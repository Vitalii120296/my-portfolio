import React from 'react';

export const PreLoader = () => {
  const lines = Array.from({ length: 18 });
  const insideLines = Array.from({ length: 24 });
  const radius = 150;
  return (
    <div className="grid w-full h-screen place-items-center">
      <div className="relative grid w-100 h-100 place-items-center">
        <div className="absolute">
          <div
            className="relative inset-0 animate-spin"
            style={{
              animationDuration: '10s'
            }}
          >
            {lines.map((_, i) => {
              const angle = (360 / lines.length) * i;
              return (
                <div
                  key={i}
                  className={`absolute top-1/2 left-1/2 w-10 ${i % 3 === 0 && 'w-2!'} h-3 bg-white origin-center rounded-sm`}
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`
                  }}
                />
              );
            })}
          </div>
        </div>
        <div
          className="relative inset-0 animate-spin "
          style={{
            animationDuration: '15s',
            animationDirection: 'reverse'
          }}
        >
          {insideLines.map((_, i) => {
            const angle = (360 / insideLines.length) * i;
            return (
              <div
                key={i}
                className={`absolute flex top-1/2 left-1/2 w-3 h-1 bg-white origin-center rounded-sm`}
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius - 20}px)`
                }}
              />
            );
          })}
        </div>
        <div className="absolute italic font-bold text-center text-8xl font-raleway text-shadow-accent text-shadow-lg">
          VH
        </div>
      </div>
    </div>
  );
};
