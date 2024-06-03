"use client";

import React, { useCallback, useMemo } from "react";
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
} from "@nextui-org/react";
import Link from "next/link";
import { IoPersonOutline, IoSettingsOutline, IoPower } from "react-icons/io5";

import DailyGoalTracker from "./daily-goal-tracker";
import { beauRivage } from "../assets/fonts";
import navbarLinks from "../data/navbar-links";
import useCurrentUser from "../hooks/use-current-user";
import useNavbar from "../hooks/use-navbar";
import useConfirmModal from "../hooks/use-confirm-modal";
import { logoutAction } from "../actions/auth-actions";
import { getNavbarSectionPath } from "../libs/string-utils";

export default function NavBar() {
    const user = useCurrentUser();
    const { navbarVisible, activeSectionPath } = useNavbar();
    const { onOpen, setTitle, setQuestion, setAction } = useConfirmModal();

    const handleLogoutRequest = useCallback(() => {
        setTitle("Log Out");
        setQuestion("Are you sure you want to log out?");
        setAction(() => async () => await logoutAction());
        onOpen();
    }, [onOpen, setAction, setQuestion, setTitle]);

    const userImage = useMemo(() => user?.image || "", [user?.image]);
    const userName = useMemo(() => user?.name || "", [user?.name]);
    const userEmail = useMemo(() => user?.email || "", [user?.email]);

    return (
        <Navbar
            maxWidth="xl"
            isBordered
            className={`${navbarVisible ? "" : "hidden"}`}
            classNames={{
                item: [
                    "text-light-300, dark:text-dark-300",
                    "hover:text-light-200, dark:hover:text-dark-200",
                    "active:text-light-200/90, dark:active:text-dark-200/90",
                    "data-[active=true]:text-blue-500",
                    "data-[active=true]:dark:text-blue-600",
                    "data-[active=true]:font-medium",
                    "transition-colors duration-100",
                ],
            }}
        >
            <NavbarContent justify="center" className="space-x-4">
                <Link
                    href="/"
                    className={`hidden lg:block ${beauRivage.className} text-3xl select-none`}
                >
                    JobJourney
                </Link>
                <NavbarContent
                    className="space-x-2 font-medium"
                    justify="center"
                >
                    {navbarLinks.map((link) => (
                        <NavbarItem
                            key={link.url}
                            isActive={
                                getNavbarSectionPath(activeSectionPath) ===
                                link.url
                            }
                        >
                            <Link href={link.url} className="text-sm">
                                {link.name}
                            </Link>
                        </NavbarItem>
                    ))}
                </NavbarContent>
            </NavbarContent>

            {/* <NavbarContent justify="center">
                <NavbarItem className="hidden md:block">
                    <DailyGoalTracker />
                </NavbarItem>
            </NavbarContent> */}

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
                            <div className="flex items-center ml-2">
                                <IoPersonOutline
                                    className="mr-2 text-light-300 dark:text-dark-300"
                                    size={16}
                                />
                                Profile
                            </div>
                        </DropdownItem>
                        <DropdownItem key="settings" textValue="Settings">
                            <div className="flex items-center ml-2">
                                <IoSettingsOutline
                                    className="mr-2 text-light-300 dark:text-dark-300"
                                    size={16}
                                />
                                Settings
                            </div>
                        </DropdownItem>
                        <DropdownItem
                            key="logout"
                            color="danger"
                            textValue="Log Out"
                            onClick={handleLogoutRequest}
                        >
                            <div className="flex items-center ml-2">
                                <IoPower
                                    className="mr-2 text-light-300 dark:text-dark-300"
                                    size={16}
                                />
                                Log Out
                            </div>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
