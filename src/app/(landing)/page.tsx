import { ArrowRight } from 'lucide-react';
import { Link } from 'next-view-transitions';

import FeatureStatusBadge from '@/components/landing/feature-status-badge';
import { FEATURES } from '@/components/landing/features-data';
import HeroActions from '@/components/landing/hero-actions';
import ProductPreview from '@/components/landing/product-preview';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className="flex flex-col gap-24 sm:gap-32">
      <section className="flex flex-col items-center text-center">
        <Link
          href="/changelog"
          className="group mb-8 inline-flex max-w-full items-center gap-2 rounded-full border bg-muted/50 py-1 pr-3 pl-1 text-xs font-medium text-foreground/80 transition-colors hover:bg-muted"
        >
          <span className="rounded-full bg-primary px-2 py-0.5 text-primary-foreground">
            New
          </span>
          <span className="truncate">
            The job applications dashboard is live
          </span>
          <ArrowRight className="size-3 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <h1 className="hero max-w-4xl text-center leading-tight font-bold tracking-tight text-balance">
          The One Management Tool You Need To Streamline Your Job Process
        </h1>
        <p className="mt-6 max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">
          JobJourney keeps your job search organized from start to finish. Track
          every application, its status and its latest update in one place.
        </p>

        <HeroActions className="mt-10" />

        <ProductPreview className="mt-16 max-w-3xl sm:mt-20" />
      </section>

      <section aria-labelledby="features-heading" className="flex flex-col">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-semibold text-muted-foreground">
            Features
          </p>
          <h2
            id="features-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
          >
            Built around your job search
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
            The dashboard is available today. Profiles, interview prep and goal
            tracking are on the way.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            const available = feature.status === 'available';

            return (
              <li
                key={feature.id}
                className={cn(
                  'flex flex-col gap-4 rounded-lg border p-6',
                  available ? 'bg-background shadow-sm' : 'bg-muted/30',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      'flex size-10 items-center justify-center rounded-md border',
                      available
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background text-muted-foreground',
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <FeatureStatusBadge status={feature.status} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-pretty text-muted-foreground">
                    {feature.summary}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <Link
          href="/features"
          className="mt-8 inline-flex items-center gap-1 self-center text-sm font-semibold text-foreground/70 transition-colors hover:text-foreground"
        >
          Explore all features
          <ArrowRight className="size-4" />
        </Link>
      </section>

      <section className="flex flex-col items-center rounded-lg border bg-muted/40 px-6 py-14 text-center sm:py-16">
        <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          Ready to get organized?
        </h2>
        <p className="mt-3 max-w-xl text-pretty text-muted-foreground">
          Put every application in one place and always know where things stand.
        </p>
        <HeroActions className="mt-8" />
      </section>
    </div>
  );
}
