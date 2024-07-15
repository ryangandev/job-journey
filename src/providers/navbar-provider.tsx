'use client';

import { createContext, useState, Dispatch, SetStateAction } from 'react';
import { usePathname } from 'next/navigation';

type NavbarProviderProps = {
  children: React.ReactNode;
};

type NavbarContextProps = {
  navbarVisible: boolean;
  setNavbarVisible: Dispatch<SetStateAction<boolean>>;
  activeSectionPath: string;
};

const NavbarContext = createContext<NavbarContextProps | null>(null);

export function NavbarProvider({ children }: NavbarProviderProps) {
  const [navbarVisible, setNavbarVisible] = useState<boolean>(true);
  const pathName = usePathname();

  return (
    <NavbarContext.Provider
      value={{
        navbarVisible,
        setNavbarVisible,
        activeSectionPath: pathName,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}

export { NavbarContext };
