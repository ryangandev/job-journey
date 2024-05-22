"use client";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicationUpdate, ApplicationUpdateType } from "@prisma/client";
import { IoTrashOutline } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { Button, Divider, Textarea } from "@nextui-org/react";
import toast from "react-hot-toast";

import {
    addApplicationUpdateAction,
    deleteApplicationUpdateByIdAction,
} from "../../actions/applications-actions";
import { ApplicationUpdateSchema } from "../../schemas/application-schema";
import {
    jobUpdateTypeMap,
    updateTypeIconMap,
    updateTypeOptions,
} from "../../data/application";
import { timeElapsed } from "../../libs/time-utils";
import CustomDropdown from "../custom-dropdown";

export default function ApplicationUpdates({
    applicationUpdates,
    applicationId,
}: {
    applicationUpdates: ApplicationUpdate[];
    applicationId: string;
}) {
    const handleDeleteUpdate = async (updateId: string) => {
        const response = await deleteApplicationUpdateByIdAction(updateId);
        if (response.error) {
            toast.error(response.error);
            return;
        }

        if (response.message) {
            toast.success(response.message);
        }
    };

    return (
        <div className="flex flex-col space-y-6">
            <h2 className="text-light-300 dark:text-dark-300 select-none">
                Application Updates
            </h2>
            <ul className="ml-3">
                {applicationUpdates.map((update, index) => (
                    <li className="flex flex-col" key={update.id}>
                        <div className="flex flex-row items-center space-x-2">
                            <span className="text-lg">
                                {updateTypeIconMap[update.type]}
                            </span>
                            <span className="text-sm space-x-2">
                                <span className="text-light-100 dark:text-dark-100">
                                    {update.content}
                                </span>
                                <span className="text-light-100 dark:text-dark-100 select-none">
                                    ·
                                </span>
                                <span className="text-sm text-light-400 dark:text-dark-400 select-none">
                                    {timeElapsed(update.createdAt)}
                                </span>
                            </span>
                            {update.type !== "auto_generated" && (
                                <button
                                    onClick={() => {
                                        handleDeleteUpdate(update.id);
                                    }}
                                >
                                    <IoTrashOutline />
                                </button>
                            )}
                        </div>
                        {index !== applicationUpdates.length - 1 && (
                            <Divider
                                className="h-4 ml-2 my-1"
                                orientation="vertical"
                            />
                        )}
                    </li>
                ))}
            </ul>
            <NewApplicationUpdateForm applicationId={applicationId} />
        </div>
    );
}

const NewApplicationUpdateForm = ({
    applicationId,
}: {
    applicationId: string;
}) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { isSubmitting, isValid, isDirty },
        reset,
    } = useForm<z.infer<typeof ApplicationUpdateSchema>>({
        resolver: zodResolver(ApplicationUpdateSchema),
        defaultValues: {
            applicationId: applicationId,
            type: "submission",
            content: "",
        },
    });

    const handleConfirmAdd = async (
        values: z.infer<typeof ApplicationUpdateSchema>,
    ) => {
        const response = await addApplicationUpdateAction(values);

        if (response.error) {
            toast.error(response.error);
            return;
        }

        if (response.message) {
            toast.success(response.message);
        }

        // Clear the form after submission
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(handleConfirmAdd)}
            className="flex flex-col items-center space-y-2"
        >
            <div className="relative w-full space-y-2">
                <div className="flex space-x-4">
                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => (
                            <CustomDropdown
                                triggerType="button"
                                buttonVariant="bordered"
                                size="sm"
                                label="Update Type"
                                value={field.value}
                                valueOptions={updateTypeOptions}
                                handleUpdate={(selectedKey) => {
                                    field.onChange(selectedKey);
                                }}
                                displayMapper={(value) =>
                                    jobUpdateTypeMap[
                                        value as ApplicationUpdateType
                                    ]
                                }
                                startContent={
                                    <span className="text-lg">
                                        {updateTypeIconMap[field.value]}
                                    </span>
                                }
                                isDisabled={isSubmitting}
                            />
                        )}
                    />
                </div>
                <Textarea
                    {...register("content")}
                    className="relative"
                    variant="bordered"
                    placeholder="Write your new update here..."
                    size="md"
                    radius="sm"
                    rows={3}
                    isDisabled={isSubmitting}
                />
                <Button
                    type="submit"
                    isIconOnly={true}
                    size="sm"
                    radius="full"
                    variant="light"
                    color="primary"
                    isLoading={isSubmitting}
                    isDisabled={!isValid || !isDirty || isSubmitting}
                    className="absolute bottom-3 right-6"
                >
                    <IoIosSend size={18} />
                </Button>
            </div>
        </form>
    );
};
