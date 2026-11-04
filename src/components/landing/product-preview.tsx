import { Search } from 'lucide-react';

import { cn } from '@/lib/utils';

type SampleStatus = 'Wishlist' | 'Applied' | 'Interviewing' | 'Offer';

// Fictional companies, for illustration only.
const SAMPLE_ROWS: {
  company: string;
  position: string;
  location: string;
  status: SampleStatus;
  updated: string;
}[] = [
  {
    company: 'Northwind Labs',
    position: 'Frontend Engineer',
    location: 'Remote',
    status: 'Interviewing',
    updated: '2 days ago',
  },
  {
    company: 'Acme Corp',
    position: 'Product Designer',
    location: 'Hybrid',
    status: 'Applied',
    updated: '5 days ago',
  },
  {
    company: 'Globex',
    position: 'Full Stack Developer',
    location: 'On-site',
    status: 'Offer',
    updated: '1 week ago',
  },
  {
    company: 'Initech',
    position: 'Software Engineer',
    location: 'Remote',
    status: 'Wishlist',
    updated: '2 weeks ago',
  },
];

const FILTERS = ['All', 'Applied', 'Interviewing', 'Offer'];

const STATUS_STYLES: Record<SampleStatus, string> = {
  Wishlist: 'text-muted-foreground ring-border',
  Applied: 'bg-muted text-foreground ring-border',
  Interviewing: 'bg-secondary text-secondary-foreground ring-foreground/20',
  Offer: 'bg-primary text-primary-foreground ring-primary',
};

function SampleStatusBadge({ status }: { status: SampleStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset',
        STATUS_STYLES[status],
      )}
    >
      {status}
    </span>
  );
}

/** A static, decorative preview of the dashboard with sample data. */
export default function ProductPreview({ className }: { className?: string }) {
  return (
    <figure className={cn('w-full', className)}>
      <div
        aria-hidden
        className="overflow-hidden rounded-lg border bg-background shadow-sm select-none"
      >
        <div className="flex items-center gap-1.5 border-b bg-muted/50 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="ml-3 truncate text-xs text-muted-foreground">
            Dashboard
          </span>
        </div>

        <div className="flex flex-col gap-4 p-4 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="text-left">
              <p className="font-semibold">Applications</p>
              <p className="text-sm text-muted-foreground">4 applications</p>
            </div>
            <div className="flex h-8 w-full items-center gap-2 rounded-md border px-3 text-sm text-muted-foreground sm:w-56">
              <Search className="size-3.5 shrink-0" />
              <span className="truncate">Search company or position</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter, index) => (
              <span
                key={filter}
                className={cn(
                  'rounded-md border px-2.5 py-1 text-xs font-medium',
                  index === 0
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'text-foreground/70',
                )}
              >
                {filter}
              </span>
            ))}
          </div>

          <ul className="divide-y rounded-lg border text-left">
            {SAMPLE_ROWS.map((row) => (
              <li
                key={row.company}
                className="flex items-center gap-3 px-4 py-3"
              >
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-semibold">
                    {row.position}
                  </span>
                  <span className="truncate text-sm text-muted-foreground">
                    {row.company} · {row.location}
                  </span>
                </div>
                <span className="hidden w-24 shrink-0 text-right text-xs text-muted-foreground sm:block">
                  {row.updated}
                </span>
                <SampleStatusBadge status={row.status} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        Preview with sample data. Companies shown are fictional.
      </figcaption>
    </figure>
  );
}
