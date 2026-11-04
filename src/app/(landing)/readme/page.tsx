import { ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import { FaGithub } from 'react-icons/fa';

import PageIntro from '@/components/landing/page-intro';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'README',
  description: 'About the JobJourney project and the technology behind it.',
};

const REPO_URL = 'https://github.com/ryangandev/job-journey';

const TECH_STACK: { name: string; href: string; description: string }[] = [
  {
    name: 'Next.js 16 and React 19',
    href: 'https://nextjs.org/',
    description: 'App Router, server actions and route protection',
  },
  {
    name: 'Auth.js v5',
    href: 'https://authjs.dev/',
    description: 'Email and password, GitHub and Google sign-in',
  },
  {
    name: 'Prisma 7 and Neon',
    href: 'https://www.prisma.io/',
    description: 'Database access on serverless PostgreSQL',
  },
  {
    name: 'Tailwind CSS 4 and shadcn/ui',
    href: 'https://tailwindcss.com/',
    description: 'Styling and UI components',
  },
  {
    name: 'Resend',
    href: 'https://resend.com/',
    description: 'Verification and password reset emails',
  },
  {
    name: 'Motion',
    href: 'https://motion.dev/',
    description: 'Animations',
  },
  {
    name: 'Zod 4 and React Hook Form',
    href: 'https://zod.dev/',
    description: 'Schema validation and forms',
  },
];

export default function ReadmePage() {
  return (
    <div className="flex flex-col gap-16">
      <PageIntro
        eyebrow="README"
        title="About JobJourney"
        description="JobJourney is an open-source project. The source code, setup guide and roadmap live on GitHub."
      >
        <Button asChild variant="outline" className="mt-2 font-semibold">
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
            <FaGithub />
            View on GitHub
            <ExternalLink className="text-muted-foreground" />
          </a>
        </Button>
      </PageIntro>

      <section aria-labelledby="about-heading" className="flex flex-col gap-4">
        <h2 id="about-heading" className="text-2xl font-bold tracking-tight">
          About
        </h2>
        <div className="flex max-w-3xl flex-col gap-4 text-pretty text-muted-foreground">
          <p>
            <strong className="font-semibold text-foreground">
              JobJourney
            </strong>{' '}
            is a comprehensive management application designed to streamline and
            organize the job search process for individuals actively seeking
            employment opportunities.
          </p>
          <p>
            Whether you&apos;re a seasoned professional or a fresh graduate,
            JobJourney provides the tools you need to efficiently manage your
            job applications from start to finish.
          </p>
        </div>
      </section>

      <section aria-labelledby="stack-heading" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 id="stack-heading" className="text-2xl font-bold tracking-tight">
            Technology stack
          </h2>
          <p className="text-muted-foreground">
            What JobJourney is built with.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {TECH_STACK.map((tech) => (
            <li key={tech.name}>
              <a
                href={tech.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-start justify-between gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-semibold">{tech.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {tech.description}
                  </span>
                </span>
                <ExternalLink
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden
                />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="license-heading"
        className="flex flex-col gap-3 rounded-lg border bg-muted/40 p-6"
      >
        <h2 id="license-heading" className="font-semibold">
          License
        </h2>
        <p className="text-sm text-muted-foreground">
          JobJourney is released under the{' '}
          <a
            href={`${REPO_URL}/blob/main/LICENSE`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4"
          >
            MIT License
          </a>
          . Contributions and feedback are welcome on{' '}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </section>
    </div>
  );
}
