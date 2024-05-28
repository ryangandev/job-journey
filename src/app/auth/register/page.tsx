import React from "react";
import { Metadata } from "next";

import RegisterForm from "../../../components/auth/register-form";

export const metadata: Metadata = {
    title: "Register",
    description: "Register page",
};

export default function RegisterPage() {
    return (
        <div className="h-screen flex justify-center items-center">
            <RegisterForm />
        </div>
    );
}
