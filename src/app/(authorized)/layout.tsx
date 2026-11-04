import { redirect } from 'next/navigation';

import AppSidebar from '@/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The proxy already redirects logged-out visitors on protected prefixes; checking here too
  // means a new page in this group is never public just because the prefix list wasn't updated
  const session = await auth();
  if (!session?.user) redirect('/login');

  return (
    // Theme tokens rather than fixed colors, so both surfaces follow light / dark mode
    <SidebarProvider className="relative grow bg-sidebar">
      <AppSidebar />
      {/* SidebarInset reserves the sidebar's width itself, so no hardcoded left margin is needed */}
      <SidebarInset className="my-2 mr-2 ml-2 min-h-0 min-w-0 rounded-[4px] border bg-background md:ml-0">
        {/* The sidebar renders as an off-canvas sheet below `md`; this is the only way to open it there */}
        <SidebarTrigger className="m-2 md:hidden" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
