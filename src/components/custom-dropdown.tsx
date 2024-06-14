import {
    Button,
    ButtonProps,
    Chip,
    ChipProps,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { ChevronDownIcon } from "../assets/svgs";

type CustomDropdownProps = {
    triggerType: "chip" | "button" | "custom";
    customTrigger?: React.ReactNode;
    chipVariant?: ChipProps["variant"];
    buttonVariant?: ButtonProps["variant"];
    size?: ChipProps["size"];
    label: string;
    value: string;
    valueOptions: string[];
    handleUpdate: (selectedKey: string | number) => void;
    colorMapper?: (value: string) => ChipProps["color"];
    displayMapper?: (value: string) => string;
    startContent?: React.ReactNode;
    isDisabled?: boolean;
};

export default function CustomDropdown({
    triggerType,
    customTrigger,
    chipVariant = "flat",
    buttonVariant = "light",
    size = "md",
    label,
    value,
    valueOptions,
    handleUpdate,
    colorMapper = () => "default",
    displayMapper = (value: string) => value,
    startContent = null,
    isDisabled = false,
}: CustomDropdownProps) {
    const renderChipTrigger = () => {
        return (
            <Chip
                size={size}
                variant={chipVariant}
                color={colorMapper(value)}
                className="text-sm p-2"
                as="button"
            >
                {displayMapper(value)}
            </Chip>
        );
    };

    const renderButtonTrigger = () => {
        return (
            <Button
                size={size}
                variant={buttonVariant}
                color={colorMapper(value)}
                startContent={startContent}
                endContent={<ChevronDownIcon className="text-small" />}
            >
                {displayMapper(value)}
            </Button>
        );
    };

    return (
        <Dropdown isDisabled={isDisabled}>
            <DropdownTrigger>
                {triggerType === "custom" && customTrigger
                    ? customTrigger
                    : triggerType === "chip"
                    ? renderChipTrigger()
                    : renderButtonTrigger()}
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label={`${label} Selection`}
                closeOnSelect={true}
                selectedKeys={[value]}
                selectionMode={"single"}
                onSelectionChange={(selectedKeys) => {
                    const selectedKey = Array.from(selectedKeys)[0];
                    handleUpdate(selectedKey);
                }}
            >
                {valueOptions.map((option) => (
                    <DropdownItem key={option}>
                        {displayMapper(option)}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}
