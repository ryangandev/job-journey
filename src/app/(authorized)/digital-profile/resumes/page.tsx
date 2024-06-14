import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function Page() {
    return (
        <Card className="rounded p-4 space-y-4" shadow="sm">
            <CardBody className="flex flex-row space-x-4">
                <div className="w-2/5 space-y-4">
                    <h3 className="text-lg font-semibold">Resumes</h3>
                    <p className="text-sm text-light-300 dark:text-dark-300">
                        Here is a list of your resumes
                    </p>
                </div>
                <div className="w-3/5">
                    <p>name</p>
                </div>
            </CardBody>
        </Card>
    );
}
