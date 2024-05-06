"use client";

import React from "react";
import { homepageOptions } from "../../data/homepage";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";

export default function HomepageOptions() {
    return (
        <div className="grid grid-rows-1 sm:grid-cols-2 sm:grid-rows-2 w-full gap-3">
            {homepageOptions.map((option, index) => (
                <Link
                    key={index}
                    href={option.url}
                    className="flex flex-row justify-between border-1 border-light-400/30 dark:border-dark-400/30 p-4 rounded-md group cursor-pointer transition-all hover:border-light-400/60 dark:hover:border-dark-400/60  active:scale-[0.995] active:bg-default-100/50"
                >
                    <div className="space-y-2">
                        <h2 className="font-bold text-xl text-light-200/95 dark:text-dark-200/95 space-x-2">
                            <span>{option.title}</span>
                            <span>{option.emoji}</span>
                        </h2>
                        <p className="text-light-300 dark:text-dark-300">
                            {option.description}
                        </p>
                    </div>
                    <IoIosArrowRoundForward
                        className="text-light-100 dark:text-dark-100 my-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-400"
                        size={48}
                    />
                </Link>
            ))}
        </div>
    );
}
