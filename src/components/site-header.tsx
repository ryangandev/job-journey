'use client';

import { Link, useTransitionRouter } from 'next-view-transitions';
import { useEffect, useState } from 'react';
import { GrGlobe } from 'react-icons/gr';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';

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
    <header
      className={cn('sticky top-0 mx-auto w-full max-w-5xl py-2 sm:py-4')}
    >
      <div
        className={cn(
          'relative flex w-full justify-between px-3',
          // 'before:absolute before:left-0 before:top-0 before:z-[-1] before:h-12 before:w-full before:rounded-xl before:border before:border-black/5 before:content-[""]',
        )}
      >
        <MainNav />
        <MobileNav />
      </div>
    </header>
  );
}

function MainNav() {
  return (
    <nav className="w-full">
      <ul className="flex justify-between">
        <li key="home" className="flex h-12 items-center px-2">
          <Link href="/" className="flex items-center text-sm font-semibold">
            <GrGlobe className="mr-2" size={16} />
            <span className="hidden sm:inline-block md:hidden lg:inline-block">
              JobJourney
            </span>
          </Link>
        </li>
        {landingNavbarLinks.map((link) => (
          <li
            key={link.title}
            className="hidden h-12 items-center px-4 md:flex"
          >
            <Link
              href={link.href}
              className={cn(
                'text-sm font-semibold text-black/70 transition-colors hover:text-black',
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
      className="ml-3 rounded-md bg-neutral-600 px-1.5 text-[12px] font-bold"
    >
      L
    </kbd>
  );
}

function ButtonGroup() {
  const user = useCurrentUser();
  useLoginShortcut(user ? '/dashboard' : '/login');

  return (
    <>
      {user ? (
        <li className="flex h-12 items-center space-x-4">
          <Button
            asChild
            size="sm"
            className="flex items-center text-sm font-semibold"
          >
            <Link href="/dashboard" aria-keyshortcuts="L">
              Dashboard
              <ShortcutHint />
            </Link>
          </Button>
        </li>
      ) : (
        <li className="flex h-12 items-center space-x-4">
          <Button
            asChild
            size="sm"
            className="flex items-center text-sm font-semibold"
          >
            <Link href="/login" aria-keyshortcuts="L">
              Log in
              <ShortcutHint />
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="secondary"
            className="hidden items-center text-sm font-semibold sm:flex"
          >
            <Link href="/signup">Sign up</Link>
          </Button>
        </li>
      )}
    </>
  );
}

function MobileNav() {
  const user = useCurrentUser();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="ml-4 flex h-12 items-center justify-center rounded-md text-black/60 transition-colors hover:text-black md:hidden"
        >
          <HiOutlineMenuAlt4 size={24} />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-72">
        <SheetTitle className="flex items-center text-sm font-semibold">
          <GrGlobe className="mr-2" size={16} />
          JobJourney
        </SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>

        <nav className="mt-8">
          <ul className="flex flex-col gap-1">
            {landingNavbarLinks.map((link) => (
              <li key={link.title}>
                <SheetClose asChild>
                  <Link
                    href={link.href}
                    className="block rounded-md px-2 py-2 text-sm font-semibold text-black/70 transition-colors hover:bg-accent hover:text-black"
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
