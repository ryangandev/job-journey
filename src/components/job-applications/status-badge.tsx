import {
  STATUS_LABELS,
  STATUS_STYLES,
  type ApplicationStatusValue,
} from '@/lib/job-applications';
import { cn } from '@/lib/utils';

export default function StatusBadge({
  status,
  className,
}: {
  status: ApplicationStatusValue;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
        STATUS_STYLES[status],
        className,
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
