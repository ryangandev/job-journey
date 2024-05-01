"use client";

import { useState } from "react";
import { ChipProps, Progress } from "@nextui-org/react";

export default function DailyGoalTracker() {
    const dailyGoal = 10;
    const [goalAchieved, setGoalAchieved] = useState(0);

    const progressColorMapper = (value: number): ChipProps["color"] => {
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

    return (
        <div className="hidden sm:flex flex-row space-x-4 items-center text-sm">
            <Progress
                aria-label="Daily Goal Tracker"
                label="Daily Goal Completion"
                classNames={{
                    label: "text-xs",
                }}
                size="sm"
                value={goalAchieved}
                maxValue={dailyGoal}
                color={progressColorMapper(goalAchieved)}
                showValueLabel={false}
                className="w-60"
            />
            <span>
                {goalAchieved}/{dailyGoal} Jobs Applied
            </span>
        </div>
    );
}
