import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';
import { SocialLinks } from '@/components/layout/SocialLinks';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { Carousel } from '@/components/layout/sections/Carousel';
import { About } from '@/components/layout/sections/About';
import { Projects } from '@/components/layout/sections/Projects';
import { MyCv } from '@/components/layout/sections/MyCv';
import { Hire } from '@/components/layout/sections/Hire';
import { Avatar } from '@/components/ui/Avatar';
import { Testimonials } from '@/components/layout/sections/Testimonials';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import { useAnimations } from '@/hooks/useAnimations';

export const HomePage = () => {
  useScrollSpy(['home', 'about', 'projects', 'testimonials', 'contacts']);
  const { fadeIn } = useAnimations();
  const { from, to } = fadeIn();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });
    let split = SplitText.create('[data-id="heading"]', {
      type: 'chars, words, lines'
    });

    tl.fromTo('[data-id="avatar"]', from, to)
      .fromTo('[data-id="chip"]', from, to)
      .fromTo('[data-id="subheading"]', from, to)
      .fromTo('[data-id="buttons"]', from, to);

    gsap.from(split.chars, {
      opacity: 0,
      y: 20,
      x: 20,
      autoAlpha: 0,
      stagger: 0.08
    });

    gsap.to('[data-id="homePage"]', {
      scrollTrigger: {
        trigger: '[data-id="carousel"]',
        start: 'center 70%',
        scrub: true
      },
      opacity: 0.1
    });
  }, []);
  return (
    <>
      {/* Heading Section */}
      <section
        className="flex relative flex-col h-[calc(100vh)] min-h-200
                    text-center justify-center items-center z-10 w-full mx-auto px-4
                    after:absolute after:content-[''] after:w-full after:h-0.5 
                    after:bg-linear-to-r after:from-white/80 after:to-transparent 
                    after:bottom-0 after:left-0 after:right-0  bg-background"
        aria-label="Introduction and overview of my skills and experience"
        id="home"
        data-id="homePage"
      >
        <div className="hidden md:block opacity-100" data-id="avatar">
          <Avatar />
        </div>
        <div className="flex flex-col gap-4 mx-auto max-w-125">
          <div data-id="chip">
            <span className="inline-flex px-3 py-1.5 bg-bgc-gray rounded-full border-border border text-sm leading-none">
              React Engineer
            </span>
          </div>
          <div>
            <h1 data-id="heading" className=" text-4xl leading-tight ">
              Talk is cheap.
              <br />
              Show me the code.
            </h1>
          </div>

          <p
            data-id="subheading"
            className="text-sm leading-relaxed text-foreground/50"
          >
            I design and code beautifully simple things,
            <br /> and I love what I do.
          </p>
          <div data-id="buttons" className="flex gap-4 pt-10 justify-center">
            <a
              className="cursor-pointer"
              href="/CV/FE_Vitalii_Hulaievych_CV.pdf"
              download
            >
              <Button variant="primary">Download CV</Button>
            </a>
            <Link to="#projects">
              <Button variant="secondary">My Projects</Button>
            </Link>
          </div>
        </div>
        {/* Backgrond */}
        <div className="absolute inset-0 grid place-items-center z-[-1] pointer-events-none select-none">
          <svg
            viewBox="0 0 512 512"
            className="font-raleway text-[400px] font-black italic opacity-15 size-full"
          >
            <text x="-3.7%" y="350" stroke="#f8f8f8" fill="#1f1f1f">
              V
            </text>
            <text x="40%" y="460" stroke="#f8f8f8" fill="#1f1f1f">
              H
            </text>
          </svg>
        </div>
        {/* Icons */}
        <div className="absolute inset-x-0 flex w-full h-8 mx-auto bottom-5 gap-x-12">
          <div className="relative flex justify-around w-full mx-auto max-w-125">
            <SocialLinks />
          </div>
        </div>
      </section>

      {/* Carousel Section*/}
      <div data-id="carousel">
        <Carousel />
      </div>

      {/* About Section */}
      <About />

      {/* Projects */}
      <Projects />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* CV */}
      <MyCv />

      {/* Hire Me */}
      <Hire />
    </>
  );
};
