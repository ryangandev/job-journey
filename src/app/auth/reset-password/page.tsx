import React from "react";
import { Metadata } from "next";

import ResetPasswordForm from "../../../components/auth/reset-password-form";

export const metadata: Metadata = {
    title: "Reset Password - JobJourney",
    description: "Reset password page",
};

export default function Page() {
    return (
        <div className="h-screen flex justify-center items-center">
            <ResetPasswordForm />
        </div>
    );
}
