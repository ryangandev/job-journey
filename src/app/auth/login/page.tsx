import React from "react";
import LoginForm from "../../../components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Login page",
};

export default function Login() {
    return (
        <div className="h-screen flex justify-center items-center">
            <LoginForm />
        </div>
    );
}
