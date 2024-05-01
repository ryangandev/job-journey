import { ChipProps } from "@nextui-org/react";

const dailyGoal = 10;

const progressColorMap = (value: number): ChipProps["color"] => {
    if (value < 4) {
        return "danger";
    } else if (value < 7) {
        return "warning";
    } else if (value < 10) {
        return "secondary";
    } else {
        return "success";
    }
};

export { dailyGoal, progressColorMap };
