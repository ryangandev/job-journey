'use client';

import { ChevronsUpDown, House, LogOut, Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { useId, useTransition } from 'react';

import { logoutAction } from '@/actions/auth-actions';
import { ThemeRadioItems } from '@/components/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import useCurrentUser from '@/hooks/use-current-user';

function UserAvatar({ name, image }: { name: string; image?: string | null }) {
  // next.config only allows GitHub avatars; other providers fall back to an initial
  const isAllowedImage = image?.startsWith(
    'https://avatars.githubusercontent.com/',
  );

  if (image && isAllowedImage) {
    return (
      <Image
        src={image}
        alt=""
        width={32}
        height={32}
        className="size-8 shrink-0 rounded-lg"
      />
    );
  }

  return (
    <span
      aria-hidden
      className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

export default function NavUser() {
  const user = useCurrentUser();
  const { isMobile } = useSidebar();
  const [isLoggingOut, startLogout] = useTransition();
  const themeLabelId = useId();

  if (!user) return null;

  const displayName = user.name || user.email || 'Account';

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserAvatar name={displayName} image={user.image} />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{displayName}</span>
                {user.email && user.email !== displayName && (
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="truncate font-semibold">{displayName}</span>
                {user.userPlan && (
                  <span className="rounded-md border px-1.5 text-[11px] font-medium text-muted-foreground">
                    {user.userPlan === 'PREMIUM' ? 'Premium' : 'Free'}
                  </span>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="gap-2">
              <Link href="/">
                <House className="size-4" />
                Home page
              </Link>
            </DropdownMenuItem>
            {isMobile ? (
              // The mobile sidebar is nearly as wide as the screen, so a submenu would open off-screen:
              // list the options inline instead
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup aria-labelledby={themeLabelId}>
                  <DropdownMenuLabel
                    id={themeLabelId}
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Theme
                  </DropdownMenuLabel>
                  <ThemeRadioItems />
                </DropdownMenuGroup>
              </>
            ) : (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="gap-2">
                  {/* Switched with CSS so server and client render the same markup */}
                  <Sun className="size-4 dark:hidden" />
                  <Moon className="hidden size-4 dark:block" />
                  Theme
                </DropdownMenuSubTrigger>
                {/* Portalled: the menu's open animation (a transform) would otherwise clip it */}
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="min-w-36">
                    <ThemeRadioItems />
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2"
              disabled={isLoggingOut}
              onSelect={() => startLogout(() => logoutAction())}
            >
              <LogOut className="size-4" />
              {isLoggingOut ? 'Logging out...' : 'Log out'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
