import { SmallText } from '@/components/ui/SmallText';
import { Heart } from 'griddy-icons';
import { PROJECTS } from '@/constants/projects';
import { useEffect, useState } from 'react';
import { useProjects } from '@/hooks/useProjects';

interface ILikedProjects {
  id: string;
}

export const Projects = () => {
  const { data, addLike, removeLike } = useProjects();
  const [likedProject, setLikedProject] = useState<ILikedProjects[]>([]);

  console.log(likedProject);
  const isLiked = (id: string) => likedProject.some((p) => p.id === id);

  useEffect(() => {
    const storage = localStorage.getItem('projects');

    setLikedProject(storage ? JSON.parse(storage) : []);
  }, []);

  const tougleLike = async (id: string) => {
    if (!data) return;

    console.log(isLiked(id));
    if (isLiked(id)) {
      removeLike.mutate(id);

      const unliked = [...likedProject.filter((p) => p.id !== id)];

      setLikedProject(unliked);
      localStorage.setItem('projects', JSON.stringify(unliked));
    } else {
      addLike.mutate(id);
      const liked = [...likedProject, { id }];

      setLikedProject(liked);
      localStorage.setItem('projects', JSON.stringify(liked));
    }
  };

  return (
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
        <p className="w-full mx-auto mb-10 tracking-wide text-center text-foreground/50">
          Some Cool Stuff I've Worked On
        </p>
      </div>
      {/* Projects Carousel */}
      <div className="relative flex flex-col items-center px-10 overflow-hidden max-h-125 sm:max-h-155 sm:flex-row pb-14 will-change-transform ">
        {/* Cards */}
        <div className="flex flex-col gap-10 pt-10 sm:py-10 max-sm:w-full sm:pr-10 sm:flex-row flex-nowrap animate-carousel-vertical animate-carousel-sm">
          {PROJECTS.map((proj, index) => (
            <div
              key={proj.id}
              className="flex flex-col flex-none w-full p-1 overflow-hidden border h-100 sm:w-110 lg:w-130 bg-card rounded-2xl border-border"
            >
              <div className="min-h-[50%] sm:min-h-[70%] rounded-2xl overflow-hidden ">
                <img
                  src={proj.img}
                  alt={proj.name}
                  className="object-cover w-full rounded-2xl"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col h-full gap-1 px-4 py-2">
                <div className="flex justify-between ">
                  <p className="font-semibold">{proj.name}</p>
                  <button
                    className="flex items-center gap-1 text-red"
                    onClick={() => {
                      tougleLike(proj.id);
                    }}
                  >
                    <Heart size={22} filled={isLiked(proj.id)} />
                    <span>
                      {data?.find((p) => p.id === proj.id)?.likes ?? 0}
                    </span>
                  </button>
                </div>
                <SmallText value={proj.description} />
              </div>
            </div>
          ))}
        </div>

        {/* Additional cards */}
        <div className="flex flex-col gap-10 pt-10 sm:py-10 max-sm:w-full sm:pr-10 sm:flex-row flex-nowrap animate-carousel-vertical animate-carousel-sm">
          {PROJECTS.map((proj, index) => (
            <div
              key={proj.id}
              className="flex flex-col flex-none w-full p-1 overflow-hidden border h-100 sm:w-110 lg:w-130 bg-card rounded-2xl border-border"
            >
              <div className="min-h-[50%] sm:min-h-[70%] rounded-2xl overflow-hidden ">
                <img
                  src={proj.img}
                  alt={proj.name}
                  className="object-cover w-full rounded-2xl"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col h-full gap-1 px-4 py-2">
                <div className="flex justify-between ">
                  <p className="font-semibold">{proj.name}</p>
                  <button
                    className="flex items-center gap-1 text-red"
                    onClick={() => {
                      tougleLike(proj.id);
                    }}
                  >
                    <Heart size={22} filled={isLiked(proj.id)} />
                    <span>
                      {data?.find((p) => p.id === proj.id)?.likes ?? 0}
                    </span>
                  </button>
                </div>
                <SmallText value={proj.description} />
              </div>
            </div>
          ))}
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
  );
};
