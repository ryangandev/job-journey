import React from "react";
import { OverlayPlacement } from "../../models/nextui-component";
import { Tooltip } from "@nextui-org/tooltip";
import EditButton from "../buttons/edit-button";

export default function EditTooltip({
    children,
    placement = "right",
    onPress = () => {},
    isDisabled,
}: {
    children: React.ReactNode;
    placement?: OverlayPlacement;
    onPress?: () => void;
    isDisabled?: boolean;
}) {
    return (
        <Tooltip
            content={<EditButton onPress={onPress} />}
            placement={placement}
            className="p-0 bg-transparent"
            isDisabled={isDisabled}
        >
            {children}
        </Tooltip>
    );
}
