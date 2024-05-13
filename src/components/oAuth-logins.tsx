"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@nextui-org/button";

export default function OAuthLogins() {
    return (
        <div className="w-full flex flex-col justify-center space-y-2">
            <Button variant="bordered">
                <FcGoogle size={24} />
                <span>Sign in with Google</span>
            </Button>
            <Button variant="bordered">
                <FaGithub size={24} />
                <span>Sign in with GitHub</span>
            </Button>
        </div>
    );
}
