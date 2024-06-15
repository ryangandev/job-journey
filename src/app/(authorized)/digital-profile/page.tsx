"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "../../../components/loader";

const DigitalProfile = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/digital-profile/profile"); // Redirect to the profile page
    }, [router]);

    return <Loader label="Loading profile..." />;
};

export default DigitalProfile;
