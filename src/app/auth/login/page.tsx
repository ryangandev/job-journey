import React from "react";
import { Metadata } from "next";

import LoginForm from "../../../components/auth/login-form";

export const metadata: Metadata = {
    title: "Login - JobJourney",
    description: "Login page",
};

export default function LoginPage() {
    return (
        <div className="h-screen flex justify-center items-center">
            <LoginForm />
        </div>
    );
}
