"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DigitalProfile = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/digital-profile/profile"); // Redirect to the profile page
    }, [router]);

    return null; // This could be a loading component if needed
};

export default DigitalProfile;
