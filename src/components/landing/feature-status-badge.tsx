import { Check, Clock } from 'lucide-react';

import type { FeatureStatus } from '@/components/landing/features-data';
import { cn } from '@/lib/utils';

export default function FeatureStatusBadge({
  status,
  className,
}: {
  status: FeatureStatus;
  className?: string;
}) {
  const available = status === 'available';
  const Icon = available ? Check : Clock;

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium whitespace-nowrap',
        available
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground ring-1 ring-border ring-inset',
        className,
      )}
    >
      <Icon className="size-3" aria-hidden />
      {available ? 'Available' : 'Coming soon'}
    </span>
  );
}
