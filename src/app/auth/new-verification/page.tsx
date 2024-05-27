import React from "react";
import { Metadata } from "next";

import NewVerificationForm from "../../../components/auth/new-verification-form";

export const metadata: Metadata = {
    title: "New Verification",
    description: "New verification page",
};

export default function NewVerificationPage() {
    return (
        <div className="h-screen flex justify-center items-center">
            <NewVerificationForm />
        </div>
    );
}
