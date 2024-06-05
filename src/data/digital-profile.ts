import React from "react";
import { ProfilePlatform } from "@prisma/client";
import { IconBaseProps } from "react-icons";
import {
    AiOutlineDiscord,
    AiFillGithub,
    AiOutlineTwitter,
    AiOutlineGlobal,
} from "react-icons/ai";
import { BiLogoGmail, BiLogoLinkedin } from "react-icons/bi";
import { SiHackerrank, SiLeetcode } from "react-icons/si";

import { prisma } from "../libs/db";

const getSocialProfilesByUserId = async (userId: string) => {
    try {
        const profileLinks = await prisma.socialProfile.findMany({
            where: {
                userId: userId,
            },
        });

        return profileLinks;
    } catch (error) {
        console.log("Error:", error);
        return {
            error: "There was an error fetching the profile links.",
        };
    }
};

const socialProfileMap: Record<
    ProfilePlatform,
    {
        name: string;
        icon: React.FunctionComponentElement<IconBaseProps>;
    }
> = {
    discord: {
        name: "Discord",
        icon: React.createElement(AiOutlineDiscord),
    },
    git_hub: {
        name: "GitHub",
        icon: React.createElement(AiFillGithub),
    },
    gmail: {
        name: "Gmail",
        icon: React.createElement(BiLogoGmail),
    },
    hacker_rank: {
        name: "HackerRank",
        icon: React.createElement(SiHackerrank),
    },
    leet_code: {
        name: "LeetCode",
        icon: React.createElement(SiLeetcode),
    },
    linked_in: {
        name: "LinkedIn",
        icon: React.createElement(BiLogoLinkedin),
    },
    twitter: {
        name: "Twitter",
        icon: React.createElement(AiOutlineTwitter),
    },
    portfolio: {
        name: "Portfolio",
        icon: React.createElement(AiOutlineGlobal),
    },
};

export { getSocialProfilesByUserId, socialProfileMap };
