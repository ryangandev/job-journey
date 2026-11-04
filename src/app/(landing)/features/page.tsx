import { Check } from 'lucide-react';
import type { Metadata } from 'next';

import FeatureStatusBadge from '@/components/landing/feature-status-badge';
import { FEATURES } from '@/components/landing/features-data';
import HeroActions from '@/components/landing/hero-actions';
import PageIntro from '@/components/landing/page-intro';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'What JobJourney offers today and what is coming next: the job applications dashboard, profiles, interview prep and goal tracking.',
};

export default function FeaturesPage() {
  return (
    <div className="flex flex-col gap-16">
      <PageIntro
        eyebrow="Features"
        title="Everything in JobJourney"
        description="JobJourney is growing one feature at a time. Here is what you can use today and what is on the roadmap."
      />

      <ul className="flex flex-col gap-6">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          const available = feature.status === 'available';

          return (
            <li
              key={feature.id}
              id={feature.id}
              className={cn(
                'grid scroll-mt-24 gap-6 rounded-lg border p-6 sm:p-8 md:grid-cols-[1fr_16rem] md:gap-10',
                available ? 'bg-background shadow-sm' : 'bg-muted/30',
              )}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={cn(
                      'flex size-10 shrink-0 items-center justify-center rounded-md border',
                      available
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background text-muted-foreground',
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h2 className="text-xl font-semibold">{feature.title}</h2>
                  <FeatureStatusBadge status={feature.status} />
                </div>
                <p className="text-pretty text-muted-foreground">
                  {feature.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 border-t pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-10">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {available ? 'What you can do' : 'Planned'}
                </p>
                <ul className="flex flex-col gap-2 text-sm">
                  {feature.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <Check
                        className={cn(
                          'mt-0.5 size-4 shrink-0',
                          available
                            ? 'text-foreground'
                            : 'text-muted-foreground',
                        )}
                        aria-hidden
                      />
                      <span
                        className={cn(!available && 'text-muted-foreground')}
                      >
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>

      <section className="flex flex-col items-center gap-6 rounded-lg border bg-muted/40 px-6 py-12 text-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Start with the dashboard
          </h2>
          <p className="text-pretty text-muted-foreground">
            Track your applications today. New features show up in the changelog
            as they ship.
          </p>
        </div>
        <HeroActions />
      </section>
    </div>
  );
}
