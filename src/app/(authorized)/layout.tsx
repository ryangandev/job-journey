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
    <SidebarProvider className="relative flex-grow bg-[#EDEDED]">
      <AppSidebar />
      {/* SidebarInset reserves the sidebar's width itself, so no hardcoded left margin is needed */}
      <SidebarInset className="my-2 mr-2 min-h-0 rounded-[4px] border bg-[#FBFBFB]">
        {/* The sidebar renders as an off-canvas sheet below `md`; this is the only way to open it there */}
        <SidebarTrigger className="m-2 md:hidden" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
