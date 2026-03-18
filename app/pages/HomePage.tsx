import { LanguagesCarousel } from '@/components/layout/LanguagesCarousel';
import { Button } from '@/components/ui/Button';
import { SmallText } from '@/components/ui/SmallText';
import { Code, EditLine, Heart } from 'griddy-icons';
import { IMAGES } from '@/constants/images';
import { SocialLinks } from '@/components/layout/SocialLinks';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { Link } from 'react-router';

type TForm = {
  name: string;
  email: string;
  message: string;
};

export const HomePage = () => {
  const { register, handleSubmit, watch, reset, formState } = useForm<TForm>({
    mode: 'onChange'
  });
  const { errors, isValid } = formState;

  useScrollSpy([
    'home',
    'carousel',
    'about',
    'projects',
    'testimonials',
    'contacts'
  ]);

  const onSubmit: SubmitHandler<TForm> = (data) => {
    console.log(data);
    reset();
  };

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
        <div className="hidden mb-10 origin-center sm:grid place-items-center">
          <div className="box-border relative rounded-full bg-bgDark2 wooble-circle ">
            <img
              alt="Dickson Palomeras"
              width="208"
              height="208"
              decoding="async"
              data-nimg="1"
              className="bg-dark-2 object-cover object-20% pointer-events-none relative z-100 block size-52 rounded-full shadow-[0_0_0_10px_rgba(255,255,255,0.2),0_0_5px_2px_rgba(0,0,0,0.3)]"
              src="/images/photo.jpeg"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 mx-auto max-w-125">
          <div>
            <span className="inline-flex px-3 py-1.5 bg-bgGray rounded-full border-white/20 border text-sm leading-none">
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
            <p className="inline-flex text-sm leading-relaxed text-white/50">
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
      <section
        className="max-w-svw bg-bgDark2"
        id="carousel"
        aria-label="Carousel showcasing various programming languages and technologies I work with"
      >
        <LanguagesCarousel />
      </section>

      {/* About Section */}
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
                <h4 className="py-5 text-xl italic leading-relaxed text-white">
                  Turning concepts into code and visions into reality.
                </h4>
              </div>
              <div>
                <p className="mt-2 text-sm font-light leading-relaxed tracking-wide text-white/55">
                  Since the beginning of my journey as a{' '}
                  <span>React Engineer</span>, I've created successful,
                  responsive websites that are fast, user-friendly, and built
                  with best practices in mind.
                </p>
              </div>
              <div>
                <p className="mt-2 text-sm font-light leading-relaxed tracking-wide text-white/55">
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
                    Crafting intuitive, visually polished interfaces with a
                    strong focus on UX.
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
                  <p className="text-xs text-white/60">
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
                  <p className="text-xs text-white/60">
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
                    <span className="text-white ">7</span>
                    {'+'}
                  </p>
                  <p className="text-sm font-normal whitespace-normal text-white/50 font-raleway">
                    Projects completed
                  </p>
                </div>
                <div className="flex flex-col w-full gap-2 text-5xl font-bold text-center md:text-3xl lg:text-5xl">
                  <p className="text-accent">
                    <span className="text-white">96</span>%
                  </p>
                  <p className="text-sm font-normal whitespace-normal text-white/50 font-raleway">
                    Positive Client Feedback
                  </p>
                </div>
                <div className="flex flex-col w-full gap-2 text-5xl font-bold text-center md:text-3xl lg:text-5xl">
                  <p className="text-accent">
                    <span className="text-white">1</span>
                    {'+'}
                  </p>
                  <p className="text-sm font-normal whitespace-normal text-white/50 font-raleway">
                    Years of Experience
                  </p>
                </div>
                <div className="flex flex-col w-full gap-2 text-5xl font-bold text-center md:text-3xl lg:text-5xl">
                  <p className="text-accent">
                    <span className="text-white">3,668</span>
                  </p>
                  <p className="text-sm font-normal whitespace-normal text-white/50 font-raleway">
                    Total Unique Visitors
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        className="relative flex flex-col pt-20 mb-4 bg-black md:pt-28 lg:pt-40 xl:pt-55"
        id="projects"
        aria-label="Showcase of projects I've worked on, highlighting my skills and experience in React engineering and UI/UX design"
      >
        {/* TOP SVG */}
        <div className="absolute inset-x-0 z-10 pointer-events-none select-none -top-1 ">
          <svg
            className="w-full h-full"
            viewBox="0 0 1430 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M0,160L6.2,176C12.3,192,25,224,37,208C49.2,192,62,128,74,90.7C86.2,53,98,43,
  111,74.7C123.1,107,135,181,148,186.7C160,192,172,128,185,112C196.9,96,
  209,128,222,138.7C233.8,149,246,139,258,144C270.8,149,283,171,295,
  197.3C307.7,224,320,256,332,229.3C344.6,203,357,117,369,101.3C381.5,85,
  394,139,406,176C418.5,213,431,235,443,208C455.4,181,468,107,480,
  106.7C492.3,107,505,181,517,197.3C529.2,213,542,171,554,133.3C566.2,96,
  578,64,591,74.7C603.1,85,615,139,628,154.7C640,171,652,149,665,138.7C676.9,
  128,689,128,702,122.7C713.8,117,726,107,738,96C750.8,85,763,75,775,
  74.7C787.7,75,800,85,812,90.7C824.6,96,837,96,849,106.7C861.5,117,874,139,
  886,149.3C898.5,160,911,160,923,160C935.4,160,948,160,960,160C972.3,160,
  985,160,997,170.7C1009.2,181,1022,203,1034,186.7C1046.2,171,1058,117,1071,
  128C1083.1,139,1095,213,1108,229.3C1120,245,1132,203,1145,170.7C1156.9,139,
  1169,117,1182,106.7C1193.8,96,1206,96,1218,90.7C1230.8,85,1243,75,1255,
  74.7C1267.7,75,1280,85,1292,106.7C1304.6,128,1317,160,1329,181.3C1341.5,203,
  1354,213,1366,218.7C1378.5,224,1391,224,1403,213.3C1415.4,203,1428,181,
  1434,170.7L1440,160L1440,0L0,0Z"
                fill="#25262A"
              />
            </g>
          </svg>
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-wide text-center title-underline md:text-5xl">
          PROJECTS
        </h1>
        <div className="">
          <p className="w-full mx-auto mb-10 tracking-wide text-center text-white/50">
            Some Cool Stuff I've Worked On
          </p>
        </div>
        {/* Projects Carousel */}
        <div className="relative flex flex-col items-center px-10 overflow-hidden max-h-125 sm:max-h-155 sm:flex-row pb-14 will-change-transform">
          {/* Cards */}
          <div className="flex flex-col gap-10 pt-10 sm:py-10 max-sm:w-full sm:pr-10 sm:flex-row flex-nowrap animate-carousel-vertical animate-carousel-sm">
            <div className="flex flex-col flex-none w-full p-1 overflow-hidden border h-70 sm:w-130 sm:h-100 bg-background rounded-2xl border-bgGray">
              <div className="min-h-[70%] bg-amber-600/20 rounded-2xl">
                <img src="" alt="" />
              </div>
              <div className="flex flex-col justify-center h-full gap-1 px-4">
                <div className="flex justify-between">
                  <p className="font-semibold">title</p>
                  <button className="flex items-center gap-1 text-red-500">
                    <Heart size={22} />
                    <span>1</span>
                  </button>
                </div>
                <SmallText value="text" />
              </div>
            </div>
            <div className="flex flex-col flex-none w-full p-1 overflow-hidden border h-70 sm:w-130 sm:h-100 bg-background rounded-2xl border-bgGray">
              <div className="min-h-[70%] bg-amber-600/20 rounded-2xl">
                <img src="" alt="" />
              </div>
              <div className="flex flex-col justify-center h-full gap-1 px-4">
                <div className="flex justify-between">
                  <p className="font-semibold">title</p>
                  <button className="flex items-center gap-1 text-red-500">
                    <Heart size={22} />
                    <span>1</span>
                  </button>
                </div>
                <SmallText value="text" />
              </div>
            </div>
            <div className="flex flex-col flex-none w-full p-1 overflow-hidden border h-70 sm:w-130 sm:h-100 bg-background rounded-2xl border-bgGray">
              <div className="min-h-[70%] bg-amber-600/20 rounded-2xl">
                <img src="" alt="" />
              </div>
              <div className="flex flex-col justify-center h-full gap-1 px-4">
                <div className="flex justify-between">
                  <p className="font-semibold">title</p>
                  <button className="flex items-center gap-1 text-red-500">
                    <Heart size={22} />
                    <span>1</span>
                  </button>
                </div>
                <SmallText value="text" />
              </div>
            </div>
          </div>

          {/* Additional cards */}
          <div className="flex flex-col gap-10 pt-10 sm:py-10 max-sm:w-full sm:pr-10 sm:flex-row flex-nowrap animate-carousel-vertical animate-carousel-sm">
            <div className="flex flex-col flex-none w-full p-1 overflow-hidden border h-70 sm:w-130 sm:h-100 bg-background rounded-2xl border-bgGray">
              <div className="min-h-[70%] bg-amber-600/20 rounded-2xl">
                <img src="" alt="" />
              </div>
              <div className="flex flex-col justify-center h-full gap-1 px-4">
                <div className="flex justify-between">
                  <p className="font-semibold">title</p>
                  <button className="flex items-center gap-1 text-red-500">
                    <Heart size={22} />
                    <span>1</span>
                  </button>
                </div>
                <SmallText value="text" />
              </div>
            </div>
            <div className="flex flex-col flex-none w-full p-1 overflow-hidden border h-70 sm:w-130 sm:h-100 bg-background rounded-2xl border-bgGray">
              <div className="min-h-[70%] bg-amber-600/20 rounded-2xl">
                <img src="" alt="" />
              </div>
              <div className="flex flex-col justify-center h-full gap-1 px-4">
                <div className="flex justify-between">
                  <p className="font-semibold">title</p>
                  <button className="flex items-center gap-1 text-red-500">
                    <Heart size={22} />
                    <span>1</span>
                  </button>
                </div>
                <SmallText value="text" />
              </div>
            </div>
            <div className="flex flex-col flex-none w-full p-1 overflow-hidden border h-70 sm:w-130 sm:h-100 bg-background rounded-2xl border-bgGray">
              <div className="min-h-[70%] bg-amber-600/20 rounded-2xl">
                <img src="" alt="" />
              </div>
              <div className="flex flex-col justify-center h-full gap-1 px-4">
                <div className="flex justify-between">
                  <p className="font-semibold">title</p>
                  <button className="flex items-center gap-1 text-red-500">
                    <Heart size={22} />
                    <span>1</span>
                  </button>
                </div>
                <SmallText value="text" />
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 left-0 hidden w-1/4 pointer-events-none bg-linear-to-r from-black sm:flex"></div>
          <div className="absolute inset-y-0 right-0 hidden w-1/4 pointer-events-none bg-linear-to-l from-black sm:flex"></div>
          <div className="absolute inset-x-0 top-0 flex pointer-events-none h-1/8 bg-linear-to-b from-black sm:hidden"></div>
          <div className="absolute inset-x-0 bottom-0 flex pointer-events-none h-1/8 bg-linear-to-t from-black sm:hidden"></div>
        </div>
        {/* Wawe animation */}
        <div className="absolute bottom-0 z-10 w-full overflow-hidden translate-y-4">
          <svg
            className="w-full h-full max-h-14 max-md:h-10"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
            aria-hidden="true"
            focusable="false"
          >
            <g className="animate-wave">
              <path
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                fill="rgba(54, 57, 62, 0.7)"
                style={{
                  animationDelay: '2s',
                  animationDuration: '7s'
                }}
                transform="translate(-150 0)"
              ></path>
              <path
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                fill="rgba(54, 57, 62, 0.5)"
                style={{
                  animationDelay: '3s',
                  animationDuration: '10s'
                }}
                transform="translate(-150 0)"
              ></path>
              <path
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                fill="rgba(54, 57, 62, 0.3)"
                style={{
                  animationDelay: '4s',
                  animationDuration: '13s'
                }}
                transform="translate(-150 0)"
              ></path>
              <path
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                fill="rgba(37, 38, 42, 0.9)"
                style={{
                  animationDelay: '5s',
                  animationDuration: '20s'
                }}
              ></path>
            </g>
          </svg>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        className="flex flex-col w-full px-5 mx-auto lg:px-10 py-15 md:py-32 max-w-desktop"
        id="testimonials"
        aria-label="Testimonials from colleagues"
      >
        <h1 className="mb-4 text-3xl font-bold tracking-wide text-center title-underline md:text-5xl">
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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

      {/* CV */}
      <section
        className="relative grid w-full px-5 mx-auto overflow-hidden bg-black place-items-center lg:px-10 py-15 md:py-32"
        aria-label="Download my CV"
      >
        <svg
          className="absolute z-10 w-full h-24 rotate-180 -top-2 text-bgDark2 min-w-3xl md:h-32 lg:h-48 xl:h-80"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,128L0,32L36.9,32L36.9,96L73.8,96L73.8,192L110.8,192L110.8,64L147.7,64L147.7,160L184.6,160L184.6,224L221.5,224L221.5,64L258.5,64L258.5,320L295.4,320L295.4,288L332.3,288L332.3,128L369.2,128L369.2,288L406.2,288L406.2,128L443.1,128L443.1,224L480,224L480,192L516.9,192L516.9,192L553.8,192L553.8,256L590.8,256L590.8,96L627.7,96L627.7,192L664.6,192L664.6,32L701.5,32L701.5,64L738.5,64L738.5,224L775.4,224L775.4,64L812.3,64L812.3,160L849.2,160L849.2,160L886.2,160L886.2,320L923.1,320L923.1,128L960,128L960,224L996.9,224L996.9,192L1033.8,192L1033.8,128L1070.8,128L1070.8,192L1107.7,192L1107.7,96L1144.6,96L1144.6,192L1181.5,192L1181.5,256L1218.5,256L1218.5,128L1255.4,128L1255.4,32L1292.3,32L1292.3,192L1329.2,192L1329.2,320L1366.2,320L1366.2,160L1403.1,160L1403.1,288L1440,288L1440,320L1403.1,320L1403.1,320L1366.2,320L1366.2,320L1329.2,320L1329.2,320L1292.3,320L1292.3,320L1255.4,320L1255.4,320L1218.5,320L1218.5,320L1181.5,320L1181.5,320L1144.6,320L1144.6,320L1107.7,320L1107.7,320L1070.8,320L1070.8,320L1033.8,320L1033.8,320L996.9,320L996.9,320L960,320L960,320L923.1,320L923.1,320L886.2,320L886.2,320L849.2,320L849.2,320L812.3,320L812.3,320L775.4,320L775.4,320L738.5,320L738.5,320L701.5,320L701.5,320L664.6,320L664.6,320L627.7,320L627.7,320L590.8,320L590.8,320L553.8,320L553.8,320L516.9,320L516.9,320L480,320L480,320L443.1,320L443.1,320L406.2,320L406.2,320L369.2,320L369.2,320L332.3,320L332.3,320L295.4,320L295.4,320L258.5,320L258.5,320L221.5,320L221.5,320L184.6,320L184.6,320L147.7,320L147.7,320L110.8,320L110.8,320L73.8,320L73.8,320L36.9,320L36.9,320L0,320L0,320Z"></path>
        </svg>
        <div className="z-20 max-w-xl px-4 py-24 text-center xl:py-70">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              Want to know more?
            </h2>
          </div>
          <div>
            <p className="max-w-lg mx-auto mb-10 text-sm font-light tracking-wide text-center text-white/55 max-md:px-5 md:mb-14">
              Download my CV to explore my experience, skills, and project work
              in detail.
            </p>
          </div>
          <div>
            <a
              className="cursor-pointer"
              href="/CV/CV_Vitalii Hulaievych_FE.pdf"
              download
            >
              <Button variant="primary">Download CV</Button>
            </a>
          </div>
        </div>
        <svg
          className="absolute bottom-0 z-10 w-full h-24 text-bgDark2 min-w-3xl md:h-32 lg:h-48 xl:h-80"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,128L0,32L36.9,32L36.9,96L73.8,96L73.8,192L110.8,192L110.8,64L147.7,64L147.7,160L184.6,160L184.6,224L221.5,224L221.5,64L258.5,64L258.5,320L295.4,320L295.4,288L332.3,288L332.3,128L369.2,128L369.2,288L406.2,288L406.2,128L443.1,128L443.1,224L480,224L480,192L516.9,192L516.9,192L553.8,192L553.8,256L590.8,256L590.8,96L627.7,96L627.7,192L664.6,192L664.6,32L701.5,32L701.5,64L738.5,64L738.5,224L775.4,224L775.4,64L812.3,64L812.3,160L849.2,160L849.2,160L886.2,160L886.2,320L923.1,320L923.1,128L960,128L960,224L996.9,224L996.9,192L1033.8,192L1033.8,128L1070.8,128L1070.8,192L1107.7,192L1107.7,96L1144.6,96L1144.6,192L1181.5,192L1181.5,256L1218.5,256L1218.5,128L1255.4,128L1255.4,32L1292.3,32L1292.3,192L1329.2,192L1329.2,320L1366.2,320L1366.2,160L1403.1,160L1403.1,288L1440,288L1440,320L1403.1,320L1403.1,320L1366.2,320L1366.2,320L1329.2,320L1329.2,320L1292.3,320L1292.3,320L1255.4,320L1255.4,320L1218.5,320L1218.5,320L1181.5,320L1181.5,320L1144.6,320L1144.6,320L1107.7,320L1107.7,320L1070.8,320L1070.8,320L1033.8,320L1033.8,320L996.9,320L996.9,320L960,320L960,320L923.1,320L923.1,320L886.2,320L886.2,320L849.2,320L849.2,320L812.3,320L812.3,320L775.4,320L775.4,320L738.5,320L738.5,320L701.5,320L701.5,320L664.6,320L664.6,320L627.7,320L627.7,320L590.8,320L590.8,320L553.8,320L553.8,320L516.9,320L516.9,320L480,320L480,320L443.1,320L443.1,320L406.2,320L406.2,320L369.2,320L369.2,320L332.3,320L332.3,320L295.4,320L295.4,320L258.5,320L258.5,320L221.5,320L221.5,320L184.6,320L184.6,320L147.7,320L147.7,320L110.8,320L110.8,320L73.8,320L73.8,320L36.9,320L36.9,320L0,320L0,320Z"></path>
        </svg>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/60 mask-[radial-gradient(var(--x)_var(--y)_at_center,white,transparent)] opacity-55 [--x:220px] [--y:180px] md:[--x:320px] md:[--y:200px] lg:[--x:400px] lg:[--y:200px] xl:[--x:800px] xl:[--y:350px]"
        >
          <defs>
            <pattern
              id="_S_2_"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
              x="-1"
              y="-1"
            >
              <path d="M.5 80V.5H80" fill="none" stroke-dasharray="4 2"></path>
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            stroke-width="0"
            fill="url(#_S_2_)"
          ></rect>
        </svg>
      </section>

      {/* Hire Me */}
      <section
        className="flex flex-col w-full px-5 mx-auto lg:px-10 py-15 md:py-32 max-w-desktop"
        id="contacts"
        aria-label="Contact me for work opportunities"
      >
        <h1 className="mb-4 text-3xl font-bold tracking-wide text-center title-underline md:text-5xl">
          HIRE ME
        </h1>
        <div>
          <p className="max-w-lg mx-auto mb-10 text-sm font-light tracking-wide text-center text-white/55 max-md:px-5 md:mb-14">
            I'm open to full-time, part-time, and freelance opportunities. Feel
            free to reach out—I'd love to connect and discuss how we can work
            together. You can contact me through this form or via email:
            <br />
            <a
              href="mailto:v.hulaievych@gmail.com"
              className="leading-normal text-white hover:text-accent"
            >
              v.hulaievych@gmail.com
            </a>
          </p>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col max-w-lg gap-4 mx-auto"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-white">
                Name
              </label>
              <input
                className={`px-4 py-2 text-white border rounded-md bg-background focus:border-accent outline-0 ${errors.name ? 'border-red-600' : 'border-bgGray'}`}
                placeholder="Name"
                type="text"
                id="name"
                {...register('name', {
                  required: 'This field is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  },
                  maxLength: {
                    value: 55,
                    message: 'Name must be max 55 characters'
                  }
                })}
              />
              {errors.name && (
                <p className="text-xs text-red">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <input
                className={`px-4 py-2 text-white border rounded-md bg-background  focus:border-accent outline-0 ${errors.email ? 'border-red-600' : 'border-bgGray'}`}
                id="email"
                type="email"
                placeholder="Email"
                {...register('email', {
                  required: 'This field is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
              />
              {errors.email && (
                <p className="text-xs text-red">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-white">
                Message
              </label>
              <textarea
                className={`px-4 py-2 text-white border rounded-md resize-none h-30 bg-background border-bgGray focus:border-accent outline-0 ${errors.message ? 'border-red-600' : 'border-bgGray'}`}
                placeholder="Type your messahe here."
                id="message"
                {...register('message', {
                  required: 'This field is required',
                  minLength: {
                    value: 10,
                    message: 'Message must be at least 10 characters'
                  }
                })}
              ></textarea>
              {errors.message && (
                <p className="text-xs text-red">{errors.message.message}</p>
              )}
            </div>
            <Button variant="wide" disabled={!isValid}>
              Send message
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};
