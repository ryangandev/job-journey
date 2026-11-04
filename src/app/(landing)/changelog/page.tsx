import type { Metadata } from 'next';

import PageIntro from '@/components/landing/page-intro';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'New features and improvements to JobJourney.',
};

type ChangeType = 'New' | 'Improved';

type Release = {
  date: string;
  label: string;
  changes: { type: ChangeType; title: string; description: string }[];
};

const RELEASES: Release[] = [
  {
    date: '2026-11-04',
    label: 'November 4, 2026',
    changes: [
      {
        type: 'New',
        title: 'Job applications dashboard',
        description:
          'Keep every application in one place. Add the company and position, set a status from Wishlist to Offer, and find what you need with status filters and search.',
      },
      {
        type: 'New',
        title: 'Dark mode',
        description:
          'Choose Light, Dark or System from the theme switcher in the site header.',
      },
      {
        type: 'New',
        title: 'Sidebar and account menu',
        description:
          'Inside the app, a sidebar takes you between pages and the account menu gets you back to the home page or logs you out.',
      },
      {
        type: 'New',
        title: 'Resend verification email',
        description:
          'Didn’t get the verification email? You can now ask for a new one from the verification screen.',
      },
      {
        type: 'Improved',
        title: 'Mobile menu and keyboard shortcut',
        description:
          'The site menu now works on phones. Press L anywhere on the site to log in, or to open your dashboard when you’re already signed in.',
      },
      {
        type: 'Improved',
        title: 'Platform upgrade',
        description:
          'JobJourney now runs on Next.js 16, React 19, Tailwind CSS 4 and Prisma 7, and includes the latest security fixes.',
      },
    ],
  },
];

function ChangeTypeBadge({
  type,
  className,
}: {
  type: ChangeType;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-xs font-medium',
        type === 'New'
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground ring-1 ring-border ring-inset',
        className,
      )}
    >
      {type}
    </span>
  );
}

export default function ChangelogPage() {
  return (
    <div className="flex flex-col gap-16">
      <PageIntro
        eyebrow="Changelog"
        title="What’s new"
        description="New features and improvements to JobJourney."
      />

      <ol className="flex flex-col gap-12">
        {RELEASES.map((release) => (
          <li
            key={release.date}
            className="grid gap-6 md:grid-cols-[12rem_1fr] md:gap-10"
          >
            <div className="md:pt-1">
              <time
                dateTime={release.date}
                className="block text-sm font-semibold md:sticky md:top-24"
              >
                {release.label}
              </time>
            </div>

            <ul className="flex flex-col divide-y rounded-lg border">
              {release.changes.map((change) => (
                <li key={change.title} className="flex flex-col gap-2 p-5">
                  <div className="flex items-start gap-2">
                    <ChangeTypeBadge type={change.type} className="mt-0.5" />
                    <h2 className="font-semibold text-balance">
                      {change.title}
                    </h2>
                  </div>
                  <p className="text-sm text-pretty text-muted-foreground">
                    {change.description}
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
