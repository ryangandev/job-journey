'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { IoPersonOutline, IoSettingsOutline, IoPower } from 'react-icons/io5';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  User,
} from '@nextui-org/react';

import { logoutAction } from '@/actions/auth-actions';
import { beauRivage } from '@/assets/fonts/fonts';
import { navbarLinks } from '@/data/navigation';
import useCurrentUser from '@/hooks/use-current-user';
import { getNavbarSectionPath } from '@/lib/utils';

export default function SiteHeader() {
  const user = useCurrentUser();
  const pathName = usePathname();

  const userImage = useMemo(() => user?.image || '', [user?.image]);
  const userName = useMemo(() => user?.name || '', [user?.name]);
  const userEmail = useMemo(() => user?.email || '', [user?.email]);

  return (
    <header>
      <Navbar
        maxWidth="xl"
        isBordered
        classNames={{
          item: [
            'text-light-300, dark:text-dark-300',
            'hover:text-light-200, dark:hover:text-dark-200',
            'active:text-light-200/90, dark:active:text-dark-200/90',
            'data-[active=true]:text-blue-500',
            'data-[active=true]:dark:text-blue-600',
            'data-[active=true]:font-medium',
            'transition-colors duration-100',
          ],
        }}
      >
        <NavbarContent justify="center" className="space-x-4">
          <Link
            href="/"
            className={`hidden lg:block ${beauRivage.className} select-none text-3xl`}
          >
            JobJourney
          </Link>
          <NavbarContent className="space-x-2 font-medium" justify="center">
            {navbarLinks.map((link) => (
              <NavbarItem
                key={link.url}
                isActive={getNavbarSectionPath(pathName) === link.url}
              >
                <Link href={link.url} className="text-sm">
                  {link.name}
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>
        </NavbarContent>

        <NavbarContent justify="center">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                name={userName}
                size="sm"
                src={userImage}
              />
            </DropdownTrigger>
            <DropdownMenu
              className="w-64"
              aria-label="Profile Actions"
              variant="flat"
            >
              <DropdownItem key="user-info" textValue="User Info">
                <div className="flex">
                  <User
                    avatarProps={{
                      src: userImage,
                    }}
                    description={userEmail}
                    name={userName}
                  />
                </div>
              </DropdownItem>
              <DropdownItem key="profile" textValue="Profile">
                <div className="ml-2 flex items-center">
                  <IoPersonOutline
                    className="text-light-300 dark:text-dark-300 mr-2"
                    size={16}
                  />
                  Profile
                </div>
              </DropdownItem>
              <DropdownItem key="settings" textValue="Settings">
                <div className="ml-2 flex items-center">
                  <IoSettingsOutline
                    className="text-light-300 dark:text-dark-300 mr-2"
                    size={16}
                  />
                  Settings
                </div>
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                textValue="Log Out"
                onClick={async () => await logoutAction()}
              >
                <div className="ml-2 flex items-center">
                  <IoPower
                    className="text-light-300 dark:text-dark-300 mr-2"
                    size={16}
                  />
                  Log Out
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>{' '}
    </header>
  );
}
