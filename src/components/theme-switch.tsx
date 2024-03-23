"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    const handleThemeSwitch = () => {
        theme === "dark" ? setTheme("light") : setTheme("dark");
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Button
            isIconOnly
            size="md"
            color="default"
            variant="bordered"
            onPress={handleThemeSwitch}
            className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 text-xl bg-opacity-80"
        >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
        </Button>
    );
}
