import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import DailyGoalTracker from "./daily-goal-tracker";
import { getApplicationsAppliedTodayCount } from "../actions/applications-actions";

export default async function NavBar() {
    const applicationsAppliedTodayCount =
        await getApplicationsAppliedTodayCount();

    return (
        <Navbar position="static">
            <NavbarBrand>
                <Link href="/" className="font-BeauRivage text-3xl select-none">
                    Job Journey
                </Link>
            </NavbarBrand>
            {/* Utility items go here */}
            <NavbarContent justify="end">
                <NavbarItem>
                    <DailyGoalTracker
                        goalAchieved={applicationsAppliedTodayCount}
                    />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
