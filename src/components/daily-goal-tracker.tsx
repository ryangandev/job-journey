import { Progress } from "@nextui-org/react";
import { dailyGoal, progressColorMap } from "../constants/daily-goal-tracker";

export default function DailyGoalTracker({
    goalAchieved,
}: {
    goalAchieved: number | { error: string };
}) {
    if (typeof goalAchieved === "object" && "error" in goalAchieved) {
        return (
            <Progress
                aria-label="Error Loading Daily Goals"
                label="Loading..."
                classNames={{
                    label: "text-xs",
                }}
                size="sm"
                isIndeterminate
                className="w-64"
            />
        );
    }

    return (
        <Progress
            aria-label="Daily Goal Tracker"
            label={`${goalAchieved}/${dailyGoal} Jobs Applied`}
            classNames={{
                label: "text-xs text-light-300 dark:text-dark-300",
                value: "font-semibold text-xs text-light-100 dark:text-dark-100",
            }}
            size="sm"
            value={goalAchieved}
            maxValue={dailyGoal}
            color={progressColorMap(goalAchieved)}
            showValueLabel={true}
            className="w-64"
        />
    );
}
