"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { NavbarProvider } from "./navbar-provider";
import { AuthProvider } from "./auth-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <NextThemeProvider
                attribute="class"
                defaultTheme="dark"
                // disableTransitionOnChange
            >
                <AuthProvider>
                    <NavbarProvider>{children}</NavbarProvider>
                </AuthProvider>
            </NextThemeProvider>
        </NextUIProvider>
    );
}
