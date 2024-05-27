"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Input,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Link,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

import { LoginSchema } from "../../schemas/auth-schema";
import { loginAction } from "../../actions/auth-actions";
import { LockIcon, MailIcon } from "../../assets/svgs";
import Divider from "../divider";
import FormMessage from "./form-message";
import OAuthLogins from "./oAuth-logins";

export default function LoginForm() {
    const searchParams = useSearchParams();
    const urlError =
        searchParams.get("error") === "OAuthAccountNotLinked"
            ? "Email used with another provider"
            : "";

    const [errorMsg, setErrorMsg] = useState<string | undefined>("");
    const [successMsg, setSuccessMsg] = useState<string | undefined>("");
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        console.log("onSubmit", values);
        setErrorMsg("");
        setSuccessMsg("");

        await loginAction(values).then((res) => {
            if (!res) return;
            setErrorMsg(res.error);
            setSuccessMsg(res.success);
        });
    };

    return (
        <Card className="max-w-md w-full p-6">
            <CardHeader className="flex flex-col items-start space-y-2">
                <div className="w-full flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Sign in</h2>
                    <FormMessage type="error" message={errorMsg || urlError} />
                    <FormMessage type="success" message={successMsg} />
                </div>
                <p className="text-base text-light-400 dark:text-dark-400 line-clamp-1">
                    to your account
                </p>
            </CardHeader>
            <CardBody className="space-y-4">
                <form
                    action={() => {}}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-2"
                >
                    <Input
                        {...register("email", { required: true })}
                        name="email"
                        type="text"
                        classNames={{
                            label: "max-h-5", // Restrict label to 1 line
                        }}
                        endContent={
                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label={`Email ${
                            errors?.email ? `- ${errors?.email?.message}` : ""
                        }`}
                        placeholder="Enter your email"
                        variant="bordered"
                        isInvalid={!!errors?.email}
                        autoComplete="on"
                        autoFocus
                    />
                    <Input
                        {...register("password", { required: true })}
                        name="password"
                        type="password"
                        classNames={{
                            label: "max-h-5", // Restrict label to 1 line
                        }}
                        endContent={
                            <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label={`Password ${
                            errors?.password
                                ? `- ${errors?.password?.message}`
                                : ""
                        }`}
                        placeholder="Enter your password"
                        variant="bordered"
                        isInvalid={!!errors?.password}
                        autoComplete="off"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        color="primary"
                        isLoading={isSubmitting}
                        isDisabled={isSubmitting}
                    >
                        Login
                    </Button>
                </form>
                <Divider label="or" />
                <OAuthLogins />
            </CardBody>
            <CardFooter className="flex space-x-2 text-sm">
                <span className="line-clamp-1">Need an account?</span>
                <Link href="/auth/register" size="sm" color="primary">
                    Register
                </Link>
            </CardFooter>
        </Card>
    );
}
