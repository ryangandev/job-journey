'use client';

import React from 'react';
import { homepageOptions } from '../../data/homepage';
import { IoIosArrowRoundForward } from 'react-icons/io';
import Link from 'next/link';

export default function HomepageOptions() {
  return (
    <div
      className="grid w-full grid-rows-1 gap-3 sm:grid-cols-2 sm:grid-rows-2"
      data-aos="fade-up"
      data-aos-delay="300"
    >
      {homepageOptions.map((option, index) => (
        <Link
          key={index}
          href={option.url}
          className="group flex cursor-pointer flex-row justify-between rounded-md border-1 border-light-400/30 p-4 transition-all hover:border-light-400/60 active:scale-[0.995] active:bg-default-100/50 dark:border-dark-400/30 dark:hover:border-dark-400/60"
        >
          <div className="space-y-2">
            <h2 className="space-x-2 text-xl font-bold text-light-200/95 dark:text-dark-200/95">
              <span>{option.title}</span>
              <span>{option.emoji}</span>
            </h2>
            <p className="text-light-300 dark:text-dark-300">
              {option.description}
            </p>
          </div>
          <IoIosArrowRoundForward
            className="my-auto text-light-100 opacity-0 transition-all duration-400 group-hover:translate-x-1.5 group-hover:opacity-100 dark:text-dark-100"
            size={48}
          />
        </Link>
      ))}
    </div>
  );
}
