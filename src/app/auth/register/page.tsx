import React from "react";
import { Metadata } from "next";

import RegisterForm from "../../../components/auth/register-form";

export const metadata: Metadata = {
    title: "Register - JobJourney",
    description: "Register page",
};

export default function Page() {
    return (
        <div className="h-screen flex justify-center items-center">
            <RegisterForm />
        </div>
    );
}
