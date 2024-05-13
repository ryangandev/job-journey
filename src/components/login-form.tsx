"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginSchema } from "../schemas/auth-schema";
import {
    Input,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Link,
} from "@nextui-org/react";
import { LockIcon, MailIcon } from "../assets/svgs";
import OAuthLogins from "./oAuth-logins";
import Divider from "./divider";

export default function LoginForm() {
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

    return (
        <Card className="max-w-md w-full p-6">
            <CardHeader className="flex flex-col items-start space-y-2">
                <h2 className="text-xl font-semibold">Sign in</h2>
                <p className="text-base text-light-400 dark:text-dark-400">
                    to your account
                </p>
            </CardHeader>
            <CardBody className="space-y-4">
                <form
                    action={() => {}}
                    onSubmit={handleSubmit(() => {})}
                    className="space-y-2"
                >
                    <Input
                        {...register("email", { required: true })}
                        name="email"
                        type="email"
                        endContent={
                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label={`Email ${
                            errors?.email ? `- ${errors?.email?.message}` : ""
                        }`}
                        placeholder="Enter your email"
                        variant="bordered"
                        isInvalid={!!errors?.email}
                        autoComplete="off"
                        autoFocus
                    />
                    <Input
                        {...register("password", { required: true })}
                        name="password"
                        type="password"
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
                <span>Need an account?</span>
                <Link href="/auth/register" size="sm" color="primary">
                    Register
                </Link>
            </CardFooter>
        </Card>
    );
}
