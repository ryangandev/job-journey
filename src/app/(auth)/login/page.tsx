import React from "react";
import LoginForm from "../../../components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Login page",
};

export default function LoginPage() {
    return (
        <div className="h-screen flex justify-center items-center">
            <LoginForm />
        </div>
    );
}
