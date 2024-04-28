import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
} from "@nextui-org/react";
import Link from "next/link";

export default function NavBar() {
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
                    {/* <Button color="primary" variant="flat">
                        LinkedIn Profile Icon
                    </Button> */}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
