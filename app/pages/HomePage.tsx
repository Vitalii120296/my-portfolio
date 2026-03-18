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

export const HomePage = () => {
  useScrollSpy([
    'home',
    'carousel',
    'about',
    'projects',
    'testimonials',
    'contacts'
  ]);

  return (
    <>
      {/* Heading Section */}
      <section
        className="flex relative flex-col min-h-[calc(100vh-55px)] 
                    text-center justify-center items-center z-10 w-full mx-auto px-4
                    after:absolute after:content-[''] after:w-full after:h-0.5 
                    after:bg-linear-to-r after:from-white/80 after:to-transparent 
                    after:bottom-0 after:left-0 after:right-0  bg-background"
        aria-label="Introduction and overview of my skills and experience"
        id="home"
      >
        <Avatar />
        <div className="flex flex-col gap-4 mx-auto max-w-125">
          <div>
            <span className="inline-flex px-3 py-1.5 bg-bgc-gray rounded-full border-border border text-sm leading-none">
              React Engineer
            </span>
          </div>
          <div className="">
            <h1 className="flex text-4xl leading-tight">
              Talk is cheap.
              <br />
              Show me the code.
            </h1>
          </div>
          <div>
            <p className="inline-flex text-sm leading-relaxed text-foreground/50">
              I design and code beautifully simple things,
              <br /> and I love what I do.
            </p>
          </div>
          <div className="flex gap-4 pt-10">
            <a
              className="cursor-pointer"
              href="/CV/CV_Vitalii Hulaievych_FE.pdf"
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
            <text x="-3.7%" y="316" stroke="#f8f8f8" fill="#1f1f1f">
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
      <Carousel />

      {/* About Section */}
      <About />

      {/* Projects */}
      <Projects />

      {/* TESTIMONIALS */}

      {/* CV */}
      <MyCv />

      {/* Hire Me */}
      <Hire />
    </>
  );
};
