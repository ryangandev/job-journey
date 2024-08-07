import { Progress } from '@nextui-org/react';
import { dailyGoal, progressColorMap } from '../constants/daily-goal-tracker';

export default function DailyGoalTracker() {
  const goalAchieved = 0;

  if (typeof goalAchieved === 'object' && 'error' in goalAchieved) {
    return (
      <div className="w-60">
        <Progress
          aria-label="Error Loading Daily Goals"
          label="Loading..."
          classNames={{
            label: 'text-xs',
          }}
          size="sm"
          isIndeterminate
        />
      </div>
    );
  }

  return (
    <div className="w-60">
      <Progress
        aria-label="Daily Goal Tracker"
        label={`${goalAchieved}/${dailyGoal} Jobs Applied`}
        classNames={{
          label: 'text-xs text-light-300 dark:text-dark-300',
          value: 'font-semibold text-xs text-light-100 dark:text-dark-100',
        }}
        size="sm"
        value={goalAchieved}
        maxValue={dailyGoal}
        color={progressColorMap(goalAchieved)}
        showValueLabel={true}
        isStriped
      />
    </div>
  );
}
