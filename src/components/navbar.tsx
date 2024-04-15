import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
} from "@nextui-org/react";

export default function NavBar() {
    return (
        <Navbar position="static">
            <NavbarBrand>
                <p className="font-BeauRivage text-3xl select-none">
                    Job Journey
                </p>
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
