'use client';

import { Link, useTransitionRouter } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GrGlobe } from 'react-icons/gr';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';

import ThemeToggle from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { landingNavbarLinks } from '@/data/navigation';
import useCurrentUser from '@/hooks/use-current-user';
import { cn } from '@/lib/utils';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-3 py-2 sm:px-4 sm:py-3">
        <MainNav />
        <MobileNav />
      </div>
    </header>
  );
}

function useIsActive() {
  const pathname = usePathname();
  return (href: string) => pathname === href || pathname.startsWith(`${href}/`);
}

function MainNav() {
  const isActive = useIsActive();

  return (
    <nav aria-label="Main" className="w-full">
      <ul className="flex items-center justify-between">
        <li key="home" className="flex h-12 items-center px-2">
          <Link
            href="/"
            className="flex items-center text-sm font-semibold"
            aria-label="JobJourney home"
          >
            <GrGlobe className="mr-2" size={16} />
            <span className="hidden sm:inline-block md:hidden lg:inline-block">
              JobJourney
            </span>
          </Link>
        </li>
        {landingNavbarLinks.map((link) => (
          <li
            key={link.title}
            className="hidden h-12 items-center px-3 md:flex lg:px-4"
          >
            <Link
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={cn(
                'text-sm font-semibold text-foreground/70 transition-colors hover:text-foreground',
                'aria-[current=page]:text-foreground',
              )}
            >
              {link.title}
            </Link>
          </li>
        ))}
        <ButtonGroup />
      </ul>
    </nav>
  );
}

const isTypingTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));

/** Pressing "L" opens the dashboard when signed in, or the login page otherwise. */
function useLoginShortcut(href: string) {
  const router = useTransitionRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'l' || event.repeat) return;
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
        return;
      }
      if (isTypingTarget(event.target)) return;

      event.preventDefault();
      router.push(href);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [href, router]);
}

function ShortcutHint() {
  return (
    <kbd
      aria-hidden
      className="ml-1 hidden rounded-sm bg-primary-foreground/20 px-1.5 font-sans text-[11px] leading-4 font-bold text-primary-foreground sm:inline-block"
    >
      L
    </kbd>
  );
}

function ButtonGroup() {
  const user = useCurrentUser();
  useLoginShortcut(user ? '/dashboard' : '/login');

  return (
    <li className="flex h-12 items-center gap-2 sm:gap-3">
      <ThemeToggle />
      {user ? (
        <Button asChild size="sm" className="font-semibold">
          <Link href="/dashboard" aria-keyshortcuts="L">
            Dashboard
            <ShortcutHint />
          </Link>
        </Button>
      ) : (
        <>
          <Button asChild size="sm" className="font-semibold">
            <Link href="/login" aria-keyshortcuts="L">
              Log in
              <ShortcutHint />
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="secondary"
            className="hidden font-semibold sm:inline-flex"
          >
            <Link href="/signup">Sign up</Link>
          </Button>
        </>
      )}
    </li>
  );
}

function MobileNav() {
  const user = useCurrentUser();
  const isActive = useIsActive();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="ml-2 flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
        >
          <HiOutlineMenuAlt4 size={22} />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-72">
        <SheetTitle className="flex items-center text-sm font-semibold">
          <GrGlobe className="mr-2" size={16} />
          JobJourney
        </SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>

        <nav aria-label="Mobile" className="mt-8">
          <ul className="flex flex-col gap-1">
            {landingNavbarLinks.map((link) => (
              <li key={link.title}>
                <SheetClose asChild>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className="block rounded-md px-2 py-2 text-sm font-semibold text-foreground/70 transition-colors hover:bg-accent hover:text-foreground aria-[current=page]:bg-accent aria-[current=page]:text-foreground"
                  >
                    {link.title}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 flex flex-col gap-2">
          {user ? (
            <SheetClose asChild>
              <Button asChild size="sm" className="font-semibold">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </SheetClose>
          ) : (
            <>
              <SheetClose asChild>
                <Button asChild size="sm" className="font-semibold">
                  <Link href="/login">Log in</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  asChild
                  size="sm"
                  variant="secondary"
                  className="font-semibold"
                >
                  <Link href="/signup">Sign up</Link>
                </Button>
              </SheetClose>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
