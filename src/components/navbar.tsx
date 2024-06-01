"use client";

import React from "react";
import {
    Navbar,
    NavbarContent,
    NavbarItem,
    Dropdown,
    DropdownTrigger,
    Avatar,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";
import Link from "next/link";

import DailyGoalTracker from "./daily-goal-tracker";
import { beauRivage } from "../assets/fonts";
import navbarLinks from "../data/navbarLinks";
import useNavbar from "../hooks/useNavbar";
import { logoutAction } from "../actions/auth-actions";

export default function NavBar() {
    const { navbarVisible, activeSectionPath } = useNavbar();

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
                            isActive={activeSectionPath === link.url}
                        >
                            <Link href={link.url} className="text-sm">
                                {link.name}
                            </Link>
                        </NavbarItem>
                    ))}
                </NavbarContent>
            </NavbarContent>

            <NavbarContent justify="center">
                <NavbarItem className="hidden md:block">
                    <DailyGoalTracker />
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="center">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name="Ryan Gan"
                            size="sm"
                            src=""
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem
                            key="profile"
                            className="h-7"
                            textValue="ryangan.dev@gmail.com"
                        >
                            <p className="font-semibold">
                                ryangan.dev@gmail.com
                            </p>
                        </DropdownItem>
                        <DropdownItem key="settings">Settings</DropdownItem>
                        <DropdownItem
                            key="logout"
                            color="danger"
                            onClick={async () => {
                                await logoutAction();
                            }}
                        >
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
