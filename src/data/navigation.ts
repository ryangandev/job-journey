import { NavbarLink } from '@/types/navigation';

export const navbarLinks: NavbarLink[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
  },
  {
    name: 'Digital Profile',
    url: '/digital-profile',
  },
  {
    name: 'Interview Prep',
    url: '/interview-prep',
  },
  {
    name: 'Goal Tracker',
    url: '/goal-tracker',
  },
] as const;
