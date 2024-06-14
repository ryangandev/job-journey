import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Auth Error - JobJourney",
    description: "Auth error page",
};

export default function Page() {
    return (
        <main className="flex flex-col h-screen justify-center items-center space-y-4">
            <h1 className="text-lg font-semibold">🔐 Auth Error</h1>
            <p>Oops! Something went wrong!</p>
            <Link href="/auth/login" className="underline text-blue-500">
                Back to login
            </Link>
        </main>
    );
}
