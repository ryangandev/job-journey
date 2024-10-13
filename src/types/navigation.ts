export type LandingNavbarSection =
  | 'Features'
  | 'Changelog'
  | 'Pricing'
  | 'FAQs'
  | 'README';

export type LandingNavbarLink = {
  title: LandingNavbarSection;
  href: string;
};
