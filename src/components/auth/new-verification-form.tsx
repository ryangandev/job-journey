"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Link,
    Spinner,
} from "@nextui-org/react";

import { newVerificationAction } from "../../actions/auth-actions";
import FormMessage from "./form-message";

export default function NewVerificationForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [errorMsg, setErrorMsg] = useState<string | undefined>("");
    const [successMsg, setSuccessMsg] = useState<string | undefined>("");

    const onSubmit = useCallback(async () => {
        if (!token) {
            setErrorMsg("Missing valid token!");
            return;
        }

        await newVerificationAction(token)
            .then((res) => {
                setErrorMsg(res.error);
                setSuccessMsg(res.success);
            })
            .catch(() => {
                setErrorMsg("Something went wrong!");
            });
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <Card className="max-w-md w-full p-6 space-y-6">
            <CardHeader className="w-full">
                <h2 className="text-lg">Verify your email</h2>
            </CardHeader>
            <CardBody className="flex flex-col justify-center items-center">
                {!errorMsg && !successMsg && (
                    <Spinner label="Confirming your verification..." />
                )}
                <FormMessage type={"error"} message={errorMsg} />
                <FormMessage type={"success"} message={successMsg} />
            </CardBody>
            <CardFooter className="flex justify-center">
                <Link href="/auth/login" size="sm">
                    Back to login
                </Link>
            </CardFooter>
        </Card>
    );
}
