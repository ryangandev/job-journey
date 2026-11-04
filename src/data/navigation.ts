import { LayoutDashboard } from 'lucide-react';

import { AppSidebarLink, LandingNavbarLink } from '@/types/navigation';

export const landingNavbarLinks: LandingNavbarLink[] = [
  {
    title: 'Features',
    href: '/features',
  },
  {
    title: 'Changelog',
    href: '/changelog',
  },
  {
    title: 'Pricing',
    href: '/pricing',
  },
  {
    title: 'FAQs',
    href: '/faqs',
  },
  {
    title: 'README',
    href: '/readme',
  },
];

/** Navigation for the signed-in app. Add an entry here when a new app page ships. */
export const appSidebarLinks: AppSidebarLink[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
];
