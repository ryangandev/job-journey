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

    const themeIconStyle = `text-2xl`;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Button
            isIconOnly
            size="md"
            color="secondary"
            variant="light"
            onPress={handleThemeSwitch}
        >
            {theme === "dark" ? (
                <FiMoon className={themeIconStyle} />
            ) : (
                <FiSun className={themeIconStyle} />
            )}
        </Button>
    );
}
