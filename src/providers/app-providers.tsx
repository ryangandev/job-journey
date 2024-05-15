"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import { NavbarProvider } from "./navbar-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <NextThemeProvider
                attribute="class"
                defaultTheme="dark"
                // disableTransitionOnChange
            >
                <NavbarProvider>{children}</NavbarProvider>
            </NextThemeProvider>
        </NextUIProvider>
    );
}
