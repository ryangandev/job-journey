"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { NavbarProvider } from "./navbar-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <NextUIProvider navigate={router.push}>
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
