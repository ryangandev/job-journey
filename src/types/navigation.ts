export type LandingNavbarSection =
  'Features' | 'Changelog' | 'Pricing' | 'FAQs' | 'README';

export type LandingNavbarLink = {
  title: LandingNavbarSection;
  href: string;
};

export type AppSidebarLink = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};
