import SiteHeader from '@/components/site-header';

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto px-4 py-8 sm:py-16">{children}</div>
    </>
  );
}
