'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import HomepageOptions from '../components/homepage/homepage-options';

export default function Home() {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 500,
      easing: 'ease-out-sine',
    });
  }, []);

  return (
    <main className="mx-auto flex max-w-7xl flex-col items-center justify-center space-y-16 px-20 py-4 pt-24 sm:pt-36 lg:px-40">
      <h1
        className="text-center text-5xl font-bold leading-normal text-[#171717]/90 dark:text-[#ededed]/90"
        data-aos="fade-up"
      >
        The One Management Tool You Need To Streamline Your Job Process
      </h1>
      <HomepageOptions />
    </main>
  );
}
