import React from "react";
import { Metadata } from "next";

import ResetPasswordForm from "../../../components/auth/reset-password-form";

export const metadata: Metadata = {
    title: "Reset Password",
    description: "Reset password page",
};

export default function ResetPasswordPage() {
    return (
        <div className="h-screen flex justify-center items-center">
            <ResetPasswordForm />
        </div>
    );
}
