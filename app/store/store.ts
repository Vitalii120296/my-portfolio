import { create } from 'zustand';

interface IMenu {
  isOpen: boolean;
  openBurgerMenu: () => void;
  closeBurgerMenu: () => void;
}

export const useBurgerMenu = create<IMenu>((set) => ({
  isOpen: false,
  openBurgerMenu: () => set({ isOpen: true }),
  closeBurgerMenu: () => set({ isOpen: false })
}));
