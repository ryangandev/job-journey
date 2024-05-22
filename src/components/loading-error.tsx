import React from "react";

export default function LoadingError({ error }: { error: string }) {
    return (
        <main
            className="h-full flex justify-center items-center p-4"
            style={{
                height: "calc(100vh - 65px)",
            }}
        >
            <p className="text-2xl font-bold text-center">❗️ {error}</p>
        </main>
    );
}
