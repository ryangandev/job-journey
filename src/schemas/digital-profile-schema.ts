import { z } from "zod";

const ProfilePlatformSchema = z.enum([
    "discord",
    "git_hub",
    "gmail",
    "hacker_rank",
    "leet_code",
    "linked_in",
    "twitter",
    "portfolio",
]);

const SocialProfileSchema = z.object({
    userId: z.string(),
    platform: ProfilePlatformSchema,
    url: z.string(),
    position: z.number(),
});

export { SocialProfileSchema };
