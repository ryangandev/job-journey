import React from "react";

export default function Divider({ label }: { label: string }) {
    return (
        <div className="flex justify-between items-center space-x-2">
            <div className="bg-black/20 dark:bg-white/20 w-full h-0.5"></div>
            <span className="text-sm text-light-200 dark:text-dark-200">
                {label}
            </span>
            <div className="bg-black/20 dark:bg-white/20 w-full h-0.5"></div>
        </div>
    );
}
