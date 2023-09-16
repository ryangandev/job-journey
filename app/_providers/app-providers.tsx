"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <NextThemeProvider
                attribute="class"
                defaultTheme="dark"
                // disableTransitionOnChange
            >
                {children}
            </NextThemeProvider>
        </NextUIProvider>
    );
}
