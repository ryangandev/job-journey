import React from "react";
import { Metadata } from "next";

import NewPasswordForm from "../../../components/auth/new-password-form";

export const metadata: Metadata = {
    title: "New Password - Job Journey",
    description: "New password page",
};

export default function NewPasswordPage() {
    return (
        <div className="h-screen flex justify-center items-center">
            <NewPasswordForm />
        </div>
    );
}
