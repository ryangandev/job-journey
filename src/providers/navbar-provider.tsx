"use client";

import { createContext, useState, Dispatch, SetStateAction } from "react";
import { NavbarSection } from "../models/navigation";

interface NavbarProviderProps {
    children: React.ReactNode;
}

interface NavbarContextProps {
    navbarVisible: boolean;
    setNavbarVisible: Dispatch<SetStateAction<boolean>>;
    activeSection: NavbarSection;
    setActiveSection: Dispatch<SetStateAction<NavbarSection>>;
}

const NavbarContext = createContext<NavbarContextProps | null>(null);

export function NavbarProvider({ children }: NavbarProviderProps) {
    const [navbarVisible, setNavbarVisible] = useState<boolean>(true);
    const [activeSection, setActiveSection] = useState<NavbarSection>("Home");

    return (
        <NavbarContext.Provider
            value={{
                navbarVisible,
                setNavbarVisible,
                activeSection,
                setActiveSection,
            }}
        >
            {children}
        </NavbarContext.Provider>
    );
}

export { NavbarContext };
