import React from "react";
import { Card, Spinner } from "@nextui-org/react";

interface LoadingProps {
    label: string;
    showWrapper?: boolean;
}

export default function loading({ label, showWrapper = true }: LoadingProps) {
    return (
        <>
            {showWrapper ? (
                <Card
                    className="flex h-48 justify-center items-center rounded"
                    shadow="sm"
                >
                    <Spinner label={label} />
                </Card>
            ) : (
                <div className="flex h-48 justify-center items-center">
                    <Spinner label={label} />
                </div>
            )}
        </>
    );
}
