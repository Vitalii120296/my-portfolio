import { Drawer, DrawerClose, DrawerContent } from '@/components/ui/drawer';
import { useBurgerMenu } from '@/store/store';
import { Avatar } from './Avatar';
import { Close } from 'griddy-icons';
import { NAVLINKS } from '@/constants/navLinks';
import { NavLink, useLocation } from 'react-router';
import { useEffect, useState } from 'react';

export const BurgerMenu = () => {
  const { isOpen, closeBurgerMenu } = useBurgerMenu();
  const { hash } = useLocation();
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const id = hash.replace('#', '') || 'home';

    setActiveId(id);
  }, [hash]);

  return (
    <Drawer
      direction="right"
      open={isOpen}
      onOpenChange={(open) => !open && closeBurgerMenu()}
    >
      <DrawerContent className="z-50 rounded-none!">
        <div className="w-full p-4 my-4 relative">
          <Avatar isBurgerMenu={true} />
          <DrawerClose asChild className="absolute right-5 top-0">
            <button className="p-1 text-foreground/50">
              <Close size={24} />
            </button>
          </DrawerClose>
        </div>
        <div className="h-full bg-sidebar text-sidebar-foreground">
          <ul className="flex flex-col items-center gap-1 list-none ">
            {NAVLINKS.map((link, i) => (
              <li className="w-full flex">
                <NavLink
                  key={i}
                  to={`#${link.id}`}
                  data-id={link.id}
                  aria-label={link.aria}
                  onClick={() => closeBurgerMenu()}
                  className={`py-2 w-full pl-4 border-l-5 border-transparent text-base font-medium 
                      ${activeId === link.id && 'bg-sidebar-primary border-accent!'}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
