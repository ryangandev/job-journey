import {
  ACTIVE_STATUSES,
  type ApplicationStatusValue,
} from '@/lib/job-applications';

/** A row of headline counts. Only plain counts: no rates that would read as more precise than they are. */
export default function SummaryStats({
  total,
  counts,
}: {
  total: number;
  counts: Record<ApplicationStatusValue, number>;
}) {
  const active = ACTIVE_STATUSES.reduce(
    (sum, status) => sum + counts[status],
    0,
  );

  const stats = [
    { key: 'total', label: 'Total', value: total, hint: 'Including wishlist' },
    {
      key: 'active',
      label: 'Active',
      value: active,
      hint: 'Applied or interviewing',
    },
    {
      key: 'interviewing',
      label: 'Interviewing',
      value: counts.INTERVIEWING,
      hint: 'Currently interviewing',
    },
    {
      key: 'offers',
      label: 'Offers',
      value: counts.OFFER,
      hint: 'Currently at offer stage',
    },
  ];

  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.key}
          data-stat={stat.key}
          className="flex flex-col gap-0.5 rounded-lg border bg-card px-4 py-3 text-card-foreground"
        >
          <dt className="text-xs font-medium text-muted-foreground">
            {stat.label}
          </dt>
          <dd className="text-2xl font-semibold tabular-nums">{stat.value}</dd>
          <dd className="text-xs leading-snug text-muted-foreground">
            {stat.hint}
          </dd>
        </div>
      ))}
    </dl>
  );
}
