import AppSidebar from '@/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
