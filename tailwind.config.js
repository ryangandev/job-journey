import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    100: "#ffffff",
                    200: "#e3e4e6",
                    300: "#a1a1a1",
                    400: "#959699",
                },
                light: {
                    100: "#1b1b1b",
                    200: "#2f2f31",
                    300: "#666666",
                    400: "#5c5c5e",
                },
            },
        },
    },
    darkMode: "class",
    plugins: [nextui()],
};
