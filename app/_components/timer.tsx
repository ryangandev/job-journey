"use client";

import React, { useState, useEffect } from "react";

function Timer() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <span className="hidden md:block font-mono" suppressHydrationWarning>
            {currentDateTime.toLocaleString("en-US", { hour12: false })}
        </span>
    );
}

export default Timer;
