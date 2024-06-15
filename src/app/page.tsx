"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import HomepageOptions from "../components/homepage/homepage-options";

export default function Home() {
    useEffect(() => {
        AOS.init({
            once: true,
            disable: "phone",
            duration: 500,
            easing: "ease-out-sine",
        });
    }, []);

    return (
        <main className="max-w-7xl mx-auto py-4 px-20 lg:px-40 flex flex-col justify-center items-center pt-24 sm:pt-36 space-y-16">
            <h1
                className="font-bold text-5xl text-[#171717]/90 dark:text-[#ededed]/90 text-center leading-normal"
                data-aos="fade-up"
            >
                The One Management Tool You Need To Streamline Your Job Process
            </h1>
            <HomepageOptions />
        </main>
    );
}
