import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl grow px-4 py-12 sm:px-6 sm:py-20">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
