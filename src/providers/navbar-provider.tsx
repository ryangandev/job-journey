"use client";

import {
    createContext,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
} from "react";
import { NavbarSection } from "../models/navigation";

interface NavbarProviderProps {
    children: React.ReactNode;
}

interface NavbarContextProps {
    activeSection: NavbarSection;
    setActiveSection: Dispatch<SetStateAction<NavbarSection>>;
}

const NavbarContext = createContext<NavbarContextProps | null>(null);

export function NavbarProvider({ children }: NavbarProviderProps) {
    const [activeSection, setActiveSection] =
        useState<NavbarSection>("Dashboard");

    return (
        <NavbarContext.Provider value={{ activeSection, setActiveSection }}>
            {children}
        </NavbarContext.Provider>
    );
}

export { NavbarContext };
