"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
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

import { NewPasswordSchema } from "../../schemas/auth-schema";
import { newPasswordAction } from "../../actions/auth-actions";
import { LockIcon } from "../../assets/svgs";
import FormMessage from "./form-message";

export default function NewPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [errorMsg, setErrorMsg] = useState<string | undefined>("");
    const [successMsg, setSuccessMsg] = useState<string | undefined>("");
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
        setErrorMsg("");
        setSuccessMsg("");

        await newPasswordAction(values, token).then((res) => {
            setErrorMsg(res.error);
            setSuccessMsg(res.success);
        });
    };

    return (
        <Card className="max-w-md w-full p-6">
            <CardHeader className="flex flex-col items-start space-y-2">
                <div className="w-full flex justify-between items-center">
                    <h2 className="text-xl font-semibold">
                        Enter a new password
                    </h2>
                    <FormMessage type="error" message={errorMsg} />
                    <FormMessage type="success" message={successMsg} />
                </div>
            </CardHeader>
            <CardBody className="space-y-4">
                <form
                    action={() => {}}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-2"
                >
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
                        Reset Password
                    </Button>
                </form>
            </CardBody>
            <CardFooter className="flex justify-center">
                <Link href="/auth/login" size="sm" color="primary">
                    Back to login
                </Link>
            </CardFooter>
        </Card>
    );
}
