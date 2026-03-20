import { Menu, Heart } from 'griddy-icons';
import { NavLink, useLocation } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { NAVLINKS } from '@/constants/navLinks';
import { BurgerMenu } from '../ui/BurgerMenu';
import { useBurgerMenu } from '@/store/store';
import { visitorService } from '@/services/visitorService';
import { useQuery } from '@tanstack/react-query';
import { useLikes } from '@/hooks/useLikes';

export const Header = () => {
  const { hash } = useLocation();
  const [style, setStyle] = useState({});
  const navRef = useRef<HTMLUListElement>(null);
  const burgerMenu = useBurgerMenu();
  const [isLiked, setIsLiked] = useState(false);
  const { likes, addLike, removeLike } = useLikes();

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
    NAVLINKS.forEach((link) => {
      sectionElems[link.id] = document.getElementById(link.id);
    });

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (const link of NAVLINKS) {
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
  }, [NAVLINKS]);

  useEffect(() => {
    const liked = localStorage.getItem('portfolio_like');

    setIsLiked(liked ? JSON.parse(liked) : false);
  }, [likes]);

  const tougleLikes = () => {
    if (isLiked) {
      removeLike.mutate();
    }
    if (!isLiked) {
      addLike.mutate();
    }
  };

  return (
    <nav className="flex justify-between w-full px-2 py-3 mx-auto h-13 max-w-wide">
      <div aria-label="Navigate to the home section of the portfolio">
        <a
          href="#home"
          className="flex items-center gap-1.5 mr-auto text-xl cursor-pointer font-raleway font-bold italic"
        >
          <span className="text-foreground">Vitalii</span>
          <span className="text-accent ">Hulaievych</span>
        </a>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden mr-2 md:flex">
          <ul ref={navRef} className="flex items-center gap-8 list-none">
            {NAVLINKS.map((link, i) => (
              <li key={i}>
                <NavLink
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
        <button
          className="p-1 gap-1 flex  items-center  px-2 py-1 rounded-2xl bg-bgc-dark-2 text-red"
          aria-label="Like this portfolio"
          onClick={() => tougleLikes()}
        >
          <Heart size={22} filled={isLiked} />
          <span>{likes || 0}</span>
        </button>

        <button
          className="p-1 text-foreground/50 md:hidden"
          aria-label="Open menu"
          onClick={() => burgerMenu.openBurgerMenu()}
        >
          <Menu size={24} filled />
        </button>
      </div>
      <BurgerMenu />
    </nav>
  );
};
