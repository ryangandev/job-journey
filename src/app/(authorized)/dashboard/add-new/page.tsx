import React from "react";
import { Metadata } from "next";

import NewApplicationForm from "../../../../components/dashboard/new-application-form";

export const metadata: Metadata = {
    title: "New Application",
    description: "Add new application to the job application dashboard.",
};

export default function AddNewPage() {
    return (
        <main
            className="flex justify-center items-center"
            style={{
                height: "calc(100vh - 65px)",
            }}
        >
            <NewApplicationForm />
        </main>
    );
}
