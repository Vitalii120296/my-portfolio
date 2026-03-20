import { SmallText } from '@/components/ui/SmallText';
import { IMAGES } from '@/constants/images';
import { db } from '@/firebase';
import { visitorService } from '@/services/visitorService';
import { doc, onSnapshot } from 'firebase/firestore';
import { Code, EditLine } from 'griddy-icons';
import { useEffect, useState } from 'react';

export const About = () => {
  const [visitors, setVisitors] = useState(0);

  const expYears = (from: Date, to: Date) => {
    let years = to.getFullYear() - from.getFullYear();

    if (from.getMonth() > to.getMonth()) years--;

    return years;
  };

  useEffect(() => {
    visitorService.incrementVisitors();

    const unsub = onSnapshot(doc(db, 'stats', 'visitors'), (snap) => {
      setVisitors(snap.data()?.count || 0);
    });

    return () => unsub();
  }, []);

  return (
    <section
      className="flex flex-col w-full px-5 mx-auto lg:px-10 pt-15 md:pt-32 max-w-desktop"
      id="about"
      aria-label="Detailed information about my background, skills, education, and technologies I work with"
    >
      <h1 className="mb-10 text-3xl font-bold tracking-wide text-center title-underline md:mb-14 md:text-5xl">
        ABOUT
      </h1>
      <div className="flex flex-col gap-10 md:flex-row gap-x-10 lg:gap-x-30">
        <div className="md:w-1/2">
          {/* Introduction */}
          <div className="mb-10">
            <div>
              <SmallText value="Introduction" />
            </div>
            <div className="">
              <h2 className="text-2xl leading-tight md:text-4xl">
                👋Hi, I'm{' '}
                <span className="text-accent">Vitalii Hulaievych</span>
              </h2>
            </div>
            <div>
              <h4 className="py-5 text-xl italic leading-relaxed text-foreground">
                Turning concepts into code and visions into reality.
              </h4>
            </div>
            <div>
              <p className="mt-2 text-sm font-light leading-relaxed tracking-wide text-foreground/55">
                Since the beginning of my journey as a{' '}
                <span>React Engineer</span>, I've created successful, responsive
                websites that are fast, user-friendly, and built with best
                practices in mind.
              </p>
            </div>
            <div>
              <p className="mt-2 text-sm font-light leading-relaxed tracking-wide text-foreground/55">
                I'm quietly confident, naturally curious, and continuously
                honing my skills—solving one problem at a time while striving
                for excellence in every project.
              </p>
            </div>
          </div>

          {/* Main Skils */}
          <div className="mb-6 [&>div]:mb-2">
            <SmallText value="Main Skills" />
            <div className="relative">
              <div className="px-6 py-5 bg-background rounded-xl">
                <h4 className="text-xl leading-tight tracking-wide text-accent">
                  React Engineering
                </h4>
                <p className="mt-2 text-sm">
                  Building scalable, maintainable web apps with modern
                  frameworks like React and Next.js.
                </p>
                <span className="absolute right-6 top-5 text-accent">
                  <Code size={24} />
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="px-6 py-5 bg-background rounded-xl">
                <h4 className="text-xl leading-tight tracking-wide text-accent">
                  UI/UX & Design Systems
                </h4>
                <p className="mt-2 text-sm">
                  Crafting intuitive, visually polished interfaces with a strong
                  focus on UX.
                </p>
                <span className="absolute right-6 top-5 text-accent">
                  <EditLine size={24} />
                </span>
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="mb-6 [&>div]:mb-2">
            <SmallText value="Education & Certifications" />
            <div className="relative">
              <div className="px-6 py-5 bg-background rounded-xl">
                <h4 className="text-xl leading-tight tracking-wide text-accent">
                  BS in Information Technology
                </h4>
                <p className="text-xs text-foreground/60">
                  Major in Information System
                </p>
                <p className="mt-2 text-sm">
                  Partido State University - Goa, Camarines Sur
                </p>
                <span className="absolute right-6 top-5 text-accent">
                  <Code size={24} />
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="px-6 py-5 bg-background rounded-xl">
                <h4 className="text-xl leading-tight tracking-wide text-accent">
                  MINDTECH
                </h4>
                <p className="text-xs text-foreground/60">
                  Training and Development Institute Inc.
                </p>
                <p className="mt-2 text-sm">Rosario, Pasig City</p>
                <span className="absolute right-6 top-5 text-accent">
                  <EditLine size={24} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="md:w-1/2">
          <div className="mb-10">
            <SmallText value="Technologies" />
            <div className="grid grid-cols-4 place-items-center gap-y-10">
              {[...IMAGES].map(({ name, href }, i) => (
                <div
                  key={i}
                  className="flex flex-col px-3 transition-all duration-300 ease-in-out shrink-0 w-fulw opacity-70 hover:opacity-100 drop-shadow-lg not-hover:grayscale cursor-cool"
                >
                  <img
                    src={href}
                    alt={name}
                    className="object-contain h-12 transition-all"
                    loading="lazy"
                  />
                  <span className="mt-3 text-xs text-center text-accent">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics  */}
          <div className="mb-10">
            <SmallText value="Metrics" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 font-geist">
              <div className="flex flex-col w-full gap-2 text-5xl font-bold text-center md:text-3xl lg:text-5xl">
                <p className="text-accent ">
                  <span className="text-foreground ">7</span>
                  {'+'}
                </p>
                <p className="text-sm font-normal whitespace-normal text-foreground/50 font-raleway">
                  Projects completed
                </p>
              </div>
              <div className="flex flex-col w-full gap-2 text-5xl font-bold text-center md:text-3xl lg:text-5xl">
                <p className="text-accent">
                  <span className="text-foreground">100</span>%
                </p>
                <p className="text-sm font-normal whitespace-normal text-foreground/50 font-raleway">
                  Positive Client Feedback
                </p>
              </div>
              <div className="flex flex-col w-full gap-2 text-5xl font-bold text-center md:text-3xl lg:text-5xl">
                <p className="text-accent">
                  <span className="text-foreground">{`${expYears(new Date('2024.09.01'), new Date())}`}</span>
                  {'+'}
                </p>
                <p className="text-sm font-normal whitespace-normal text-foreground/50 font-raleway">
                  Years of Experience
                </p>
              </div>
              <div className="flex flex-col w-full gap-2 text-5xl font-bold text-center md:text-3xl lg:text-5xl">
                <p className="text-accent">
                  <span className="text-foreground">{visitors}</span>
                </p>
                <p className="text-sm font-normal whitespace-normal text-foreground/50 font-raleway">
                  Total Unique Visitors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
