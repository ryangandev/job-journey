"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../../../components/loading";

const DigitalProfile = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/digital-profile/profile"); // Redirect to the profile page
    }, [router]);

    return <Loading label="Loading profile..." />;
};

export default DigitalProfile;
