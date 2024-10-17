'use client';

import Link from 'next/link';
import { GrGlobe } from 'react-icons/gr';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';

import { Button } from '@/components/ui/button';
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

function ButtonGroup() {
  const user = useCurrentUser();

  return (
    <>
      {user ? (
        <li className="flex h-12 items-center space-x-4">
          <Link href="/dashboard">
            <Button
              size="sm"
              className="flex items-center text-sm font-semibold"
            >
              Dashboard
              <kbd className="ml-3 rounded-md bg-neutral-600 px-1.5 text-[12px] font-bold">
                L
              </kbd>
            </Button>
          </Link>
        </li>
      ) : (
        <li className="flex h-12 items-center space-x-4">
          <Link href="/login">
            <Button
              size="sm"
              className="flex items-center text-sm font-semibold"
            >
              Log in
              <kbd className="ml-3 rounded-md bg-neutral-600 px-1.5 text-[12px] font-bold">
                L
              </kbd>
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center text-sm font-semibold"
            >
              Sign up
            </Button>
          </Link>
        </li>
      )}
    </>
  );
}

function MobileNav() {
  return (
    <span className="ml-4 flex h-12 items-center justify-center md:hidden">
      <HiOutlineMenuAlt4
        size={24}
        className="cursor-pointer rounded-md text-black/60 transition-colors hover:text-black"
      />
    </span>
  );
}
