import { Drawer, DrawerClose, DrawerContent } from '@/components/ui/drawer';
import { useBurgerMenu } from '@/store/store';
import { Avatar } from './Avatar';
import { Close } from 'griddy-icons';
import { NAVLINKS } from '@/constants/navLinks';
import { NavLink } from 'react-router';

export const BurgerMenu = () => {
  const { isOpen, closeBurgerMenu } = useBurgerMenu();

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
            {NAVLINKS.map((link) => (
              <li className="w-full flex">
                <NavLink
                  key={link.id}
                  to={`#${link.id}`}
                  data-id={link.id}
                  className="py-2 w-full pl-4 border-l-5 border-accent text-base font-medium"
                  aria-label={link.aria}
                  onClick={() => closeBurgerMenu()}
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
