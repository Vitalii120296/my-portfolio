import { useAnimations } from '@/hooks/useAnimations';
import React, { useEffect } from 'react';

export const Testimonials = () => {
  const { fadeInTitle } = useAnimations();
  useEffect(() => {
    fadeInTitle('headingTestimonials');
  }, []);
  return (
    <section
      className="flex flex-col w-full px-5 mx-auto lg:px-10 py-15 md:py-32 max-w-desktop"
      id="testimonials"
      aria-label="Testimonials from colleagues"
    >
      <h1
        data-id="headingTestimonials"
        className="mb-4 text-3xl font-bold tracking-wide text-center title-underline md:text-5xl"
      >
        TESTIMONIALS
      </h1>
      <div>
        <p className="max-w-lg mx-auto mb-10 text-sm font-light tracking-wide text-center text-white/55 max-md:px-5 md:mb-14">
          A few kind words from colleagues
        </p>
      </div>
      <div>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto mb-4 stroke-1 size-24 md:size-32"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <path d="M8 12a2 2 0 0 0 2-2V8H8"></path>
          <path d="M14 12a2 2 0 0 0 2-2V8h-2"></path>{' '}
        </svg>
      </div>
      <h2 className="text-xl font-light leading-tight text-center text-foreground md:text-2xl">
        No Testimonials Yet
      </h2>
      <p className="mt-2 text-sm text-center px-9 text-white/40">
        Once someone writes a recommendation, it will show up here.
      </p>
    </section>
  );
};
