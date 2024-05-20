import React from "react";

export default function NotAuthorized() {
    return (
        <main
            className="h-full flex justify-center items-center p-4"
            style={{
                height: "calc(100vh - 65px)",
            }}
        >
            <p className="text-2xl font-bold text-center">
                🔒 You must be logged in to view this page.
            </p>
        </main>
    );
}
