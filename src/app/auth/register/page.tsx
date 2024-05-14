import React from "react";
import RegisterForm from "../../../components/register-form";
import { Metadata } from "next";

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
