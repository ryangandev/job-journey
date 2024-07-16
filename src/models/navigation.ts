export type NavbarSectionName =
  | 'Home'
  | 'Dashboard'
  | 'Digital Profile'
  | 'Interview Prep'
  | 'Goal Tracker';

export type NavbarLink = {
  name: NavbarSectionName;
  url: string;
};
