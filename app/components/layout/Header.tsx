import { Menu, Heart } from 'griddy-icons';
import { NavLink, useLocation, useParams } from 'react-router';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';

const links = [
  {
    id: 'home',
    label: 'Home',
    aria: 'Navigate to the home section of the portfolio'
  },
  {
    id: 'about',
    label: 'About',
    aria: 'Navigate to the about section where you can find detailed information about my background, skills, education, and technologies I work with'
  },
  {
    id: 'projects',
    label: 'Projects',
    aria: "Navigate to the projects section where you can see a showcase of projects I've worked on, highlighting my skills and experience in React engineering and UI/UX design"
  },
  {
    id: 'testimonials',
    label: 'Testimonials',
    aria: 'Navigate to the testimonials section where you can read feedback and recommendations from my colleagues and clients'
  },
  {
    id: 'contacts',
    label: 'Contact',
    aria: 'Navigate to the contact section where you can find ways to get in touch with me for work opportunities or collaborations'
  }
];

export const Header = () => {
  const { hash } = useLocation();
  const [style, setStyle] = useState({});
  const navRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const id = hash.replace('#', '') || 'home';

    const el = navRef.current?.querySelector(
      `[data-id="${id}"]`
    ) as HTMLElement | null;

    if (el) {
      const { offsetLeft, offsetWidth } = el as HTMLElement;

      setStyle({
        transform: `translateX(${offsetLeft}px)`,
        width: offsetWidth
      });
    }
  }, [hash]);

  useEffect(() => {
    const sectionElems: Record<string, HTMLElement | null> = {};
    links.forEach((link) => {
      sectionElems[link.id] = document.getElementById(link.id);
    });

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (const link of links) {
        const sec = sectionElems[link.id];
        if (!sec) continue;

        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;

        if (scrollPos >= top && scrollPos < bottom) {
          const el = navRef.current?.querySelector(
            `[data-id="${link.id}"]`
          ) as HTMLElement | null;
          if (el) {
            setStyle({
              transform: `translateX(${el.offsetLeft}px)`,
              width: el.offsetWidth
            });
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // для початкового стану

    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  return (
    <nav className="flex justify-between w-full px-2 py-3 mx-auto h-14 max-w-wide">
      <div aria-label="Navigate to the home section of the portfolio">
        <a
          href="#home"
          className="flex items-center gap-1.5 mr-auto text-xl cursor-pointer font-raleway font-bold italic"
        >
          <span className="text-white">Vitalii</span>
          <span className="text-accent ">Hulaievych</span>
        </a>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden mr-2 md:flex">
          <ul ref={navRef} className="flex items-center gap-8 list-none">
            {links.map((link) => (
              <li>
                <NavLink
                  key={link.id}
                  to={`#${link.id}`}
                  data-id={link.id}
                  className="pb-2"
                  aria-label={link.aria}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <span
            className="absolute -bottom-4 h-0.5 bg-accent transition-all duration-300"
            style={style}
          />
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-2xl bg-bgDark2 text-red">
          <button className="p-1" aria-label="Like this portfolio">
            <Heart size={22} filled />
          </button>
          <span>11</span>
        </div>
        <button className="p-1 text-white/50 md:hidden" aria-label="Open menu">
          <Menu size={32} filled />
        </button>
      </div>
    </nav>
  );
};
