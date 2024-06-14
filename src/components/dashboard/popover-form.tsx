"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import {
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import { IoIosSend } from "react-icons/io";

import { OverlayPlacement } from "../../models/nextui-component";

type PopoverFormProps = {
    popoverPlacement?: OverlayPlacement;
    backDrop?: "opaque" | "blur" | "transparent";
    formTitle?: string;
    originalValue?: string;
    onConfirm: (newValue: string) => Promise<void>;
    popoverTriggerComponent: React.ReactNode;
};
export default function PopoverForm({
    popoverPlacement = "right-start",
    backDrop = "opaque",
    formTitle = "",
    originalValue = "",
    onConfirm,
    popoverTriggerComponent,
}: PopoverFormProps) {
    const [newValue, setNewValue] = useState(originalValue);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOnUpdate = async () => {
        if (newValue.trim() === originalValue) {
            setNewValue(originalValue);
            setIsPopoverOpen(false);
            return;
        }

        setIsSubmitting(true);
        await onConfirm(newValue);
        setIsSubmitting(false);
        setIsPopoverOpen(false);
    };

    const handleCancelUpdate = () => {
        if (isSubmitting) return;

        setNewValue(originalValue);
        setIsPopoverOpen(false);
    };

    return (
        <Popover
            placement={popoverPlacement}
            backdrop={backDrop}
            isOpen={isPopoverOpen}
            onKeyDown={(e) => {
                if (e.key === "Escape") {
                    handleCancelUpdate();
                } else if (e.key === "Enter") {
                    handleOnUpdate();
                }
            }}
        >
            <PopoverTrigger
                onClick={() => {
                    setIsPopoverOpen(true);
                }}
                className="cursor-pointer transition-transform"
            >
                {popoverTriggerComponent}
            </PopoverTrigger>
            <PopoverContent className="w-[400px] px-4 py-2">
                {(titleProps) => (
                    <div className="px-1 py-2 w-full space-y-2">
                        <p
                            className="text-medium font-bold text-foreground"
                            {...titleProps}
                        >
                            {formTitle}
                        </p>
                        <div className="relative mt-2 flex w-full">
                            <Input
                                variant="bordered"
                                autoFocus
                                value={newValue}
                                onValueChange={setNewValue}
                                isDisabled={isSubmitting}
                                classNames={{
                                    innerWrapper: "pr-6",
                                }}
                            />
                            <Button
                                isIconOnly={true}
                                size="sm"
                                radius="full"
                                variant="light"
                                color="primary"
                                className="absolute right-2 top-1"
                                onPress={handleOnUpdate}
                                isDisabled={isSubmitting}
                                isLoading={isSubmitting}
                            >
                                <IoIosSend size={18} />
                            </Button>
                        </div>
                        <div className="flex">
                            <span className="text-tiny text-light-400 dark:text-dark-400 select-none">
                                Press escape to{" "}
                                <span className="text-light-100 dark:text-dark-100">
                                    cancel
                                </span>{" "}
                                · enter to{" "}
                                <span className="text-light-100 dark:text-dark-100">
                                    save
                                </span>
                            </span>
                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}
